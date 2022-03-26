// Create class overworld
class Overworld {
  // Create constructor
  constructor(config) {
    // Create element
    this.element = config.element;
    // Create canvas
    this.canvas = this.element.querySelector(".game-canvas");
    // Create ctx
    this.ctx = this.canvas.getContext("2d");
    // Create map
    this.map = null;
  }

  // Create init function
  init() {
    // Define map
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

    // Create socket connection
    const socket = io();

    this.ctx.font = "16px Arial";

    // direction input
    this.directionInput = new DirectionInput();
    // call init method from direction input
    this.directionInput.init();

    // Listen for keypress
    document.addEventListener("keydown", (e) => {
      // direction from direction input
      const direction = this.directionInput.direction;
      //emit dir to server
      socket.emit("keyPress", direction);
    });

    // Listen for keyup
    document.addEventListener("keyup", (e) => {
      // direction from direction input
      const direction = this.directionInput.direction;
      //emit dir to server
      socket.emit("keyPress", direction);
    });

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillText(
      "Loading...",
      this.canvas.width / 2 - 50,
      this.canvas.height / 2
    );

    // when recive newPositions from server
    socket.on("newPositions", (data) => {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // draw lower layer map
      this.map.drawLowerImage(this.ctx);

      // draw all player
      for (let i = 0; i < data.length; i++) {
        // use utils.withGrid to convert x and y to grid
        var player_x = utils.withGrid(data[i].x);
        var player_y = utils.withGrid(data[i].y);
        var src = data[i].src;

        // draw text
        this.ctx.fillText("P", player_x, player_y);
      }

      // draw upper layer map
      this.map.drawUpperImage(this.ctx);
    });
  }
}
