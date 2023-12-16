// filename: complex_code.js
//
// This code demonstrates a sophisticated and elaborate implementation of a web-based chat application.
// It includes features such as user authentication, real-time message updates, and database integration.

// Import necessary modules
const express = require('express');
const socketIO = require('socket.io');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Set up Express server
const app = express();
const server = require('http').Server(app);
const io = socketIO(server);
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chat_app', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define user schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

// Define message schema
const messageSchema = new mongoose.Schema({
  text: String,
  user: String,
});

// Define models
const User = mongoose.model('User', userSchema);
const Message = mongoose.model('Message', messageSchema);

// Set up Express middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && await bcrypt.compare(password, user.password)) {
      res.send({ success: true, message: 'Login successful' });
    } else {
      res.send({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: 'An error occurred' });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();
    res.send({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.send({ success: false, message: 'An error occurred' });
  }
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('sendMessage', async ({ text, user }) => {
    const message = new Message({ text, user });

    try {
      await message.save();
      io.emit('messageReceived', message);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('getMessages', async () => {
    try {
      const messages = await Message.find().sort('_id').limit(20);
      socket.emit('messages', messages);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});