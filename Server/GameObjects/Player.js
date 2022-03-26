// Create class Player
class Player {
  // Create constructor
  constructor(config) {
    this.Id = config.socket_id;
    this.x = config.x || 5;
    this.y = config.y || 6;
    this.number = Math.floor(10 * Math.random());
    this.hp = 100;
    this.maxHp = 100;
    this.speed = 0.1;
    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
    this.movingProgressRemaining = 0;
  }

  // socket on keyPress
  keyPress(Direction) {
    this.direction = Direction;
  }

  update() {
    // call updatePosition
    this.updatePosition();

    // if movingProgressRemaining is 0 and direction is not null
    if (
      this.movingProgressRemaining === 0 &&
      this.direction !== null &&
      this.direction !== undefined
    ) {
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    // If still moving is in progress
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction] || [];
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }
}
module.exports = Player;
