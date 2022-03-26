console.log("DirectionInput.js loaded");
// create class DirectionInput
class DirectionInput {
  // create constructor
  constructor() {
    // map held directions
    this.heldDirections = [];

    // map key codes to directions
    this.map = {
      ArrowUp: "up",
      KeyW: "up",
      ArrowDown: "down",
      KeyS: "down",
      ArrowLeft: "left",
      KeyA: "left",
      ArrowRight: "right",
      KeyD: "right",
    };
  }

  // create get direction method
  get direction() {
    // return held directions
    return this.heldDirections[0];
  }

  // create init method
  init() {
    // Listen for keydown
    document.addEventListener("keydown", (e) => {
      // get key code
      const dir = this.map[e.code];
      // if key code is in map
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        // add key code to held directions
        this.heldDirections.unshift(dir);
      }
    });

    // Listen for keyup
    document.addEventListener("keyup", (e) => {
      // get key code
      const dir = this.map[e.code];
      // get index of key code in held directions
      const index = this.heldDirections.indexOf(dir);
      // if key code is in held directions
      if (index > -1) {
        // remove key code from held directions
        this.heldDirections.splice(index, 1);
      }
    });
  }
}
