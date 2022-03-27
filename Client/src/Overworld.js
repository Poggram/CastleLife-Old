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

  startGameLoop() {
    // step arrow function
    const step = () => {
      // clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // draw lower layer map
      this.map.drawLowerImage(this.ctx);

      // for each player in players
      for (var i in this.players_list) {
        // Calculate player x and y with function withGrid in Utils
        var player_x = utils.withGrid(this.players_list[i].x);
        var player_y = utils.withGrid(this.players_list[i].y);
        // draw leter p
        this.ctx.fillText("p", player_x, player_y);
      }

      // draw upper layer map
      this.map.drawUpperImage(this.ctx);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  // Create init function
  init() {
    // Define map
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

    // Create socket connection
    const socket = io();

    this.ctx.font = "16px Arial";

    // Define player list
    this.players_list = {};

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

    // When recive init from server
    socket.on("init", (data) => {
      // For each player
      for (var i = 0; i < data.player.length; i++) {
        // Create player
        const player = new Player(data.player[i]);
        // Add player to players
        this.players_list[player.Id] = player;
      }
    });

    // When recive update from server
    socket.on("update", (data) => {
      // for each player in data
      for (var i = 0; i < data.player.length; i++) {
        var pack = data.player[i];
        var player = this.players_list[pack.Id];
        if (player) {
          if (pack.x !== undefined) {
            player.x = pack.x;
          }
          if (pack.y !== undefined) {
            player.y = pack.y;
          }
        }
      }
    });

    // when recive remove from server
    socket.on("remove", (data) => {
      // for each player in data
      for (var i = 0; i < data.player.length; i++) {
        // remove player from players
        delete this.players_list[data.player[i]];
      }
    });

    // Start game loop
    this.startGameLoop();
  }
}
