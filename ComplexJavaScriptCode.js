/* 
   Filename: ComplexJavaScriptCode.js
   Description: This code demonstrates the implementation of a complex algorithm using JavaScript. 
                It generates a random maze using a depth-first search algorithm and then solves it using Dijkstra's algorithm.
*/

// Define the maze class
class Maze {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.maze = Array(rows * 2 + 1)
      .fill(null)
      .map(() => Array(cols * 2 + 1).fill(true));
  }

  generateMaze() {
    const stack = [];
    const visited = Array(this.rows)
      .fill(null)
      .map(() => Array(this.cols).fill(false));

    function isValid(x, y) {
      return x >= 0 && x < this.rows && y >= 0 && y < this.cols && !visited[x][y];
    }

    function getNeighbours(x, y) {
      const neighbours = [];
      if (isValid.call(this, x - 1, y)) neighbours.push({ x, y, direction: 'UP' });
      if (isValid.call(this, x + 1, y)) neighbours.push({ x, y, direction: 'DOWN' });
      if (isValid.call(this, x, y - 1)) neighbours.push({ x, y, direction: 'LEFT' });
      if (isValid.call(this, x, y + 1)) neighbours.push({ x, y, direction: 'RIGHT' });
      return neighbours;
    }

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function generate() {
      let { x, y } = { x: Math.floor(Math.random() * this.rows), y: Math.floor(Math.random() * this.cols) };
      stack.push({ x, y });
      visited[x][y] = true;

      while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const neighbours = getNeighbours.call(this, current.x, current.y);

        if (neighbours.length === 0) {
          stack.pop();
        } else {
          shuffle(neighbours);
          const { x, y, direction } = neighbours[0];
          visited[x][y] = true;

          const midX = current.x * 2 + 1;
          const midY = current.y * 2 + 1;

          if (direction === 'UP') {
            this.maze[midX - 1][midY] = false;
            this.maze[midX][midY] = false;
            stack.push({ x, y });
          }
          if (direction === 'DOWN') {
            this.maze[midX + 1][midY] = false;
            this.maze[midX][midY] = false;
            stack.push({ x, y });
          }
          if (direction === 'LEFT') {
            this.maze[midX][midY - 1] = false;
            this.maze[midX][midY] = false;
            stack.push({ x, y });
          }
          if (direction === 'RIGHT') {
            this.maze[midX][midY + 1] = false;
            this.maze[midX][midY] = false;
            stack.push({ x, y });
          }
        }
      }
    }

    generate.call(this);
  }

  solveMaze() {
    const startNode = { x: 0, y: 0, distance: 0 };
    const endNode = { x: this.rows - 1, y: this.cols - 1 };
    const visited = Array(this.rows)
      .fill(null)
      .map(() => Array(this.cols).fill(false));

    const queue = [startNode];
    const distances = Array(this.rows)
      .fill(null)
      .map(() => Array(this.cols).fill(Number.POSITIVE_INFINITY));
    distances[startNode.x][startNode.y] = 0;

    const getNeighbours = (x, y) => {
      const neighbours = [];
      if (x - 1 >= 0 && !visited[x - 1][y] && !this.maze[x * 2][y * 2 + 1])
        neighbours.push({ x: x - 1, y, distance: distances[x][y] + 1 });
      if (x + 1 < this.rows && !visited[x + 1][y] && !this.maze[x * 2 + 2][y * 2 + 1])
        neighbours.push({ x: x + 1, y, distance: distances[x][y] + 1 });
      if (y - 1 >= 0 && !visited[x][y - 1] && !this.maze[x * 2 + 1][y * 2])
        neighbours.push({ x, y: y - 1, distance: distances[x][y] + 1 });
      if (y + 1 < this.cols && !visited[x][y + 1] && !this.maze[x * 2 + 1][y * 2 + 2])
        neighbours.push({ x, y: y + 1, distance: distances[x][y] + 1 });
      return neighbours;
    };

    while (queue.length > 0) {
      const { x, y, distance } = queue.shift();
      visited[x][y] = true;

      if (x === endNode.x && y === endNode.y) break;

      const neighbours = getNeighbours(x, y);
      neighbours.forEach((neighbour) => {
        if (neighbour.distance < distances[neighbour.x][neighbour.y]) {
          distances[neighbour.x][neighbour.y] = neighbour.distance;
          queue.push(neighbour);
        }
      });
    }

    return distances[endNode.x][endNode.y];
  }
}

// Usage example
const maze = new Maze(10, 10);
maze.generateMaze();
console.log(maze.maze);
const shortestPath = maze.solveMaze();
console.log('Shortest path length:', shortestPath);