let balls = [];

function setup() {
  createCanvas(650, 620);
  // Create the first ball
  balls.push(new Ball());
}

timer=0;
function draw() {
  background(20);
  
  // Loop through all the balls
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
    
    // Check for edge collisions and ball-to-ball collisions
    balls[i].checkEdges();
    for (let j = i + 1; j < balls.length; j++) {
      balls[i].checkCollision(balls[j]);
    }
  }

  // Generate a new ball at the mouse position when the mouse is pressed
  if (mouseIsPressed) {
    if (timer>0)
    {
      timer =timer-1;
    }
    else
    {
      balls.push(new Ball(mouseX, mouseY));
      timer=20;
    }
  }
  else
  {
    timer = 0
  }
}

// Ball class
class Ball {
  constructor(x = random(width), y = random(height)) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-3, 3), random(-3, 3));
    this.radius = 20;
    this.color = color(random(255), random(255), random(255));
  }

  // Move the ball
  move() {
    this.position.add(this.velocity);
  }

  // Display the ball
  display() {
    fill(this.color);
    noStroke();
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  // Check for collisions with edges and change color on impact
  checkEdges() {
    let hitEdge = false;

    if (this.position.x - this.radius <= 0 || this.position.x + this.radius >= width) {
      this.velocity.x *= -1;
      hitEdge = true;
    }
    if (this.position.y - this.radius <= 0 || this.position.y + this.radius >= height) {
      this.velocity.y *= -1;
      hitEdge = true;
    }
    
    // If it hit an edge, change color and spawn a new ball
    if (hitEdge) {
      this.color = color(random(255), random(255), random(255));
    }
  }

  // Check for collision with another ball
  checkCollision(other) {
    let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y);
    let minDist = this.radius + other.radius;
    
    if (distance < minDist) {
      // Simple collision handling by reversing velocity
      let temp = this.velocity.copy();
      this.velocity = other.velocity.copy();
      other.velocity = temp.copy();
    }
  }
}

// done
