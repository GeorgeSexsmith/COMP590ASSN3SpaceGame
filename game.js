"use strict";
var keysdown = {};
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; 
  }
  
  keysdown[event.key] = true;

  event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
  if (event.defaultPrevented) {
    return; 
  }

  keysdown[event.key] = false;

  event.preventDefault();
}, true);

window.addEventListener("blur", function () {
  keysdown = {};
});

window.onload = function() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext("2d");
  var stars = [];
      
  var sun = new Star(context)
  stars.push(sun)
  sun.addPlanet(5,80,0.02,"red")
  sun.addPlanet(10, 150, 0.03, "green")
  sun.addPlanet(20, 500, 0.01, "gray")
  sun.getPlanet(1).addMoon(3,30,0.05)

  var blue = new Star(context, 10, 300, 300, 10, 5, "blue")
  stars.push(blue)

  blue.addPlanet()

  var player = new Player(context, 10, 1, 1, "gray", canvas.width / 2, canvas.height / 2);
  var aliveSince = null;
  var secondsAlive = 0;

  var timeStep = 1000 / 60;
  var lastFrameTimeMs = null;
  var accumulatedTime = 0;
  var simulationTime = 0;


  requestAnimationFrame(Game_loop);
  function Game_loop(timestamp) {   
    if (lastFrameTimeMs == null) {
      lastFrameTimeMs = timestamp;
    }

    var elapsedTime = timestamp - lastFrameTimeMs;
    lastFrameTimeMs = timestamp;

    accumulatedTime += Math.min(elapsedTime, 250);
          
    while (accumulatedTime >= timeStep) {
      processInput();

      simulationTime += timeStep;
      update(simulationTime);

      accumulatedTime -= timeStep;
    }

    draw();
    
    requestAnimationFrame(Game_loop);
  }

  function update(timestamp) {
    stars.forEach(function(c) {c.update();})
    player.update();

    if (aliveSince == null || isPlayerTouchingObject()) {
      aliveSince = timestamp;
    }
    secondsAlive = Math.floor((timestamp - aliveSince) / 1000);
  }

  function isTouching(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    var radius = a.size + b.size;
    return dx * dx + dy * dy <= radius * radius;
  }

  function isPlayerTouchingObject() {
    return stars.some(function(star) {
      return isTouching(player, star) || star.planets.some(function(planet) {
        return isTouching(player, planet) || planet.moons.some(function(moon) {
          return isTouching(player, moon);
        });
      });
    });
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(function(c) {c.draw();})
    player.draw();

    context.save();
    context.font = "24px sans-serif";
    context.fillStyle = "white";
    context.shadowColor = "black";
    context.shadowBlur = 4;
    context.textAlign = "right";
    context.fillText("Time alive: " + secondsAlive + "s", canvas.width - 20, 35);
    context.restore();
  }

  function processInput() {
    if(keysdown.ArrowLeft) {
      player.left();
    }
      
      if(keysdown.ArrowUp){
      player.up();
    }
          
    if (keysdown.ArrowRight) {
      player.right();
    }
          
    if (keysdown.ArrowDown) {
      player.down();
    }
  }

}
