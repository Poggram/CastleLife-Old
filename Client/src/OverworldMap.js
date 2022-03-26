// Create class OverworldMap
class OverworldMap {
  // Create constructor
  constructor(config) {
    // Create lower image
    this.lowerImage = new Image();
    // Create upper image
    this.upperImage = new Image();
    // Set lower image source
    this.lowerImage.src = config.lowerSrc;
    // Set upper image source
    this.upperImage.src = config.upperSrc;
    // Create game objects
    this.gameObjects = config.gameObjects;
  }
  // Create draw lower image function
  drawLowerImage(ctx) {
    // Draw lower image
    ctx.drawImage(this.lowerImage, 0, 0);
  }
  // Create draw upper image function
  drawUpperImage(ctx) {
    // Draw upper image
    ctx.drawImage(this.upperImage, 0, 0);
  }
}

// Array of all possible map
window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: "/img/maps/DemoLower.png",
    upperSrc: "/img/maps/DemoUpper.png",
  },
};
