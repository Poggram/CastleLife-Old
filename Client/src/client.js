// Create function init
const init = () => {
  // Create const overworld
  const overworld = new Overworld({
    element: document.querySelector(".game-container"),
  });

  overworld.init();
};

// Called when the html request
(() => {
  console.log("Client side javascript file is loaded!");

  // Call init function
  init();
})();
