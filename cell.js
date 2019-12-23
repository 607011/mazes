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

