// Copyright (c) 2019 Oliver Lau <oliver@ersatzworld.net>

const Direction = {
  None: 0,
  Top: 1,
  Right: 2,
  Bottom: 4,
  Left: 8,
}

class Cell {
  constructor(id) {
    this.id = id
    this.block = Direction.None
  }
  /**
   * @param {Direction} direction
   */
  open(direction) {
    this.block &= ~direction
  }
  /**
   * @param {Direction} direction
   */
  close(direction) {
    this.block |= direction
  }
  /**
   * @param {Direction} direction
   * @return {Boolean} true if direction is blocked
   */
  isBlocked(direction) {
    return (this.block & direction) !== 0
  }
}

class Maze {
  constructor(w, h) {
    this.w = w
    this.h = h
    this.maze = [...Array(w)].map(e => Array(h).fill(null))
  }
  at(x, y) {
    return this.maze[x][y]
  }
  set(x, y, cell) {
    this.maze[x][y] = cell
  }
  postprocess() {
    const Directions = {
      [Direction.Top]: { x: 0, y: -1 },
      [Direction.Right]: { x: 1, y: 0 },
      [Direction.Bottom]: { x: 0, y: 1 },
      [Direction.Left]: { x: -1, y: 0 }
    }
    const CounterDirections = {
      [Direction.Top]: Direction.Bottom,
      [Direction.Right]: Direction.Left,
      [Direction.Bottom]: Direction.Top,
      [Direction.Left]: Direction.Right
    }
    for (let x = 0; x < this.w; ++x) {
      this.maze[x][0].close(Direction.Top)
      this.maze[x][this.h -  1].close(Direction.Bottom)
    }
    for (let y = 0; y < this.h; ++y) {
      this.maze[0][y].close(Direction.Left)
      this.maze[this.w - 1][y].close(Direction.Right)
    }
    for (let x = 0; x < this.w; ++x) {
      for (let y = 0; y < this.h; ++y) {
        for (const [direction, v] of Object.entries(Directions)) {
          const i = x + v.x
          const j = y + v.y
          if (this.maze[x][y].isBlocked(direction)) {
            if (i >= 0 && i < this.w && j >= 0 && j < this.h) {
              this.maze[i][j].close(CounterDirections[direction])
            }
          }
        }
      }
    }
  }
}

Maze.CSS = {
  [Direction.Top]: 'block-top',
  [Direction.Right]: 'block-right',
  [Direction.Bottom]: 'block-bottom',
  [Direction.Left]: 'block-left',
}
