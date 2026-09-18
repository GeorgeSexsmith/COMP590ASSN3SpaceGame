"use strict";

class Star {
  constructor(context, size = 40, x = 0, y = 0, velocity_x = 1, velocity_y =1, color = "yellow") {
  this.velocity_x = velocity_x;
  this.velocity_y = velocity_y;
  this.color = color;
  this.context = context;
  this.size = size;
  this.x = x;
  this.y = y;

  this.planets = [];
  }
  getPlanet(number = 0) {
    return this.planets[number];
  }
  
  addPlanet(size = 10, distance = 50, velocity = 0.2, color = "blue") {
    var planet = new Planet(this, size, distance, velocity, color);

    this.planets.push(planet);
  }

  draw() {

    this.context.beginPath();

    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.arc(0, 0, this.size, 0, Math.PI *2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.lineWidth =1;
    this.context.strokeStyle = this.color;
    this.context.stroke();

    this.context.restore();

    this.planets.forEach(function(c) {c.draw();})

  }

  update() {
    this.x = this.x + this.velocity_x;
    this.y = this.y + this.velocity_y;

    if (this.x > this.context.canvas.width) {
      this.velocity_x = -Math.abs(this.velocity_x);
    }
    if (this.x < 0) {
      this.velocity_x = Math.abs(this.velocity_x);
    }
    if (this.y > this.context.canvas.height) {
      this.velocity_y = -Math.abs(this.velocity_y);
    }
    if (this.y < 0) {
      this.velocity_y = Math.abs(this.velocity_y);
    }
    this.planets.forEach(function(c) {c.update();})
  }
}

class Planet {
  constructor(star, size = 10, distance = 50, velocity =1, color = "yellow") {
  this.star = star;
  this.context = star.context;
  this.color = color;

  this.distance = distance;
  this.velocity = velocity;
  this.angle = 0;
  this.x = 0;
  this.y = 0;

  this.size = size;

  this.moons = [];
  }

  addMoon(size = 1, distance = 5, velocity = 0.002, color = "gray") {
    var moon = new Moon(this, size, distance, velocity, color);

    this.moons.push(moon);
  }

  update() {
    this.angle = this.angle + this.velocity;

    this.x = this.star.x + Math.cos(this.angle) * this.distance;
    this.y = this.star.y + Math.sin(this.angle) * this.distance;
    this.moons.forEach(function(c) {c.update();})
  }

  draw() {

    this.context.beginPath();

    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.arc(0, 0, this.size, 0, Math.PI *2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.lineWidth =1;
    this.context.strokeStyle = this.color;
    this.context.stroke();


    this.context.restore();
    this.moons.forEach(function(c) {c.draw();})
  }
}

class Moon {
  constructor(planet, size = 1, distance = 5, velocity =0.001, color = "gray") {
  this.planet = planet
  this.star = planet.star;
  this.context = planet.star.context;
  this.color = color;

  this.distance = distance;
  this.velocity = velocity;
  this.angle = 0;
  this.x = 0;
  this.y = 0;

  this.size = size;
  }

  update() {
    this.angle = this.angle + this.velocity;

    this.x = this.planet.x + Math.cos(this.angle) * this.distance;
    this.y = this.planet.y + Math.sin(this.angle) * this.distance;
    
  }

  draw() {

    this.context.beginPath();

    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.arc(0, 0, this.size, 0, Math.PI *2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.lineWidth =1;
    this.context.strokeStyle = this.color;
    this.context.stroke();

    this.context.restore();
  }
}

class Player {
  constructor(context, size =10, velocity_x = 1, velocity_y =1, color = "gray", x =0, y =0) {
    this.context = context;
    this.size = size;
    this.velocity_x = velocity_x;
    this.velocity_y =velocity_y;
  
    this.color = color;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "Space_Ship.gif";
  }

  draw() {
    if (this.image.complete && this.image.naturalWidth > 0) {
      this.context.drawImage(
        this.image,
        this.x - this.size *2,
        this.y - this.size *2,
        this.size * 4,
        this.size * 4
      );
    }
  }

  update() {
    this.x = this.x + this.velocity_x;
    this.y = this.y + this.velocity_y;

    if (this.x > this.context.canvas.width) {
      this.velocity_x = -Math.abs(this.velocity_x);
    }
    if (this.x < 0) {
      this.velocity_x = Math.abs(this.velocity_x);
    }
    if (this.y > this.context.canvas.height) {
      this.velocity_y = -Math.abs(this.velocity_y);
    }
    if (this.y < 0) {
      this.velocity_y = Math.abs(this.velocity_y);
    }
  }

  down() {
    this.velocity_y+= 0.1;
    if(this.velocity_y > 2) { this.velocity_y = 2}
  }

  up() {
    this.velocity_y-= 0.1;
    if(this.velocity_y < -2) { this.velocity_y = -2}
  }

  left() {
   this.velocity_x-= 0.1;
   if(this.velocity_x < -2) { this.velocity_x = -2}
  }

  right() {
    this.velocity_x+= 0.1;
    if(this.velocity_x > 2) { this.velocity_x = 2}
  }

}
