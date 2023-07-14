class Bird {
  constructor(imageHeight) {
    this.x = 50;
    this.y = height/2;
    this.vel = 0;
    this.gravity = m_gravity;
    this.h = imageHeight;
  }

  applyForce(force) {
    // console.log('this.vel = ' + this.vel);
    // if (this.vel < -4) force *= 0.25;
    this.vel += force;
  }

  update() {
    this.applyForce(this.gravity);
    this.y += this.vel;

    if (this.y < 0) {
      this.y = 0;
      this.vel = 0;
    } else if (this.y > height-this.h) {
      this.y = height-this.h;
      this.vel = 0;
    }
  }

  show() {
    noStroke();
    fill(255);
    push();
    translate(this.x, this.y);
    rotate(this.vel*2);
    // image(m_birdImg, this.x, this.y);
    image(m_birdImg, 0, 0);
    pop();
  }

}