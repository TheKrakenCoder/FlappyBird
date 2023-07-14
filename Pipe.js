class Pipe {
  constructor() {

    this.x = width;
    let midpoint = random(100, height-100);
    let space = random(100, 150);
    this.topY = midpoint - space/2;
    this.botY = midpoint + space/2;
    this.capHeight = 25;
  }

  update() {
    this.x -= m_pipeSpeed;;
  }

  show() {
    // top pipe and cap
    image(m_bodyPipeImg, this.x, 0, 35, this.topY);
    image(m_topPipeImg, this.x, this.topY-this.capHeight, 35, this.capHeight);

    // bottom pipe and cap
    image(m_bodyPipeImg, this.x, this.botY, 35, height - this.botY);
    image(m_botPipeImg, this.x, this.botY, 35, this.capHeight);
  }

  hitBird(bird) {
    // two rectangles intersection
    if (0) {
      let vertBuffer = 10;
      let bl = bird.x;
      let br = bird.x + m_birdImg.width;
      let bt = bird.y + vertBuffer;
      let bb = bird.y + m_birdImg.height - vertBuffer;;

      let al = this.x;
      let ar = this.x + 35;
      let at = 0;
      let ab = this.topY;

      let collide = false;
      if (al < br && ar > bl && at < bb && ab > bt) {
        collide = true;
      }
      al = this.x;
      ar = this.x + 35;
      at = this.botY;
      ab = height;
      if (al < br && ar > bl && at < bb && ab > bt) {
        collide = true;
      }
      return collide;
    } else {
    // rectangle/cricle intersection  
      let arect = {};
      arect.x = this.x;
      arect.y = 0;
      arect.w = 35;
      arect.h = this.topY;
      let collide = this.rectCircleColliding(bird, arect);
      if (collide) return true;
      arect.x = this.x;
      arect.y = this.botY;
      arect.w = 35;
      arect.h = height-this.topY;
      collide = this.rectCircleColliding(bird, arect);
      return collide;
    }

  }

  // circle x, y is center and r is radius
  // arect x, y is upper left and w, h are width and height
  rectCircleColliding(bird, arect) { //circle, rect){
    let vertBuffer = 10;
    let circle = {};
    circle.r = bird.h/2 - vertBuffer;
    circle.x = bird.x + bird.h/2;
    circle.y = bird.y + bird.h/2;
    // noFill();
    // stroke(255);
    // ellipse(circle.x, circle.y, circle.r*2);

    var distX = Math.abs(circle.x - arect.x-arect.w/2);
    var distY = Math.abs(circle.y - arect.y-arect.h/2);

    if (distX > (arect.w/2 + circle.r)) { return false; }
    if (distY > (arect.h/2 + circle.r)) { return false; }

    if (distX <= (arect.w/2)) { return true; } 
    if (distY <= (arect.h/2)) { return true; }

    var dx=distX-arect.w/2;
    var dy=distY-arect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

}
