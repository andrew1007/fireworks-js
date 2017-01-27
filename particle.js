class Particle {
  constructor(x = 0, y = 0, ctx, canvas, radius, color){
    this.x = x
    this.y = y
    this.gravity = 0.2
    this.resistance = 0.92
    this.context = ctx
    this.canvas = canvas
    this.posX = this.canvas.width / 2
    this.posY = this.canvas.height
    let angle = Math.random() * Math.PI * 2
    let speed = Math.cos(Math.random() * Math.PI / 2) * 15.7
    // console.log(speed);
    this.velX = Math.cos(angle) * speed + 0.5;
    this.velY = Math.sin(angle) * speed;
    this.radius = radius
    this.size = 5.5
    this.shrink = .960
    this.color = color
  }

  velX(){
    return Math.cos(this.angle) * this.speed
  }

  velY(){
    return Math.cos(this.angle) * this.speed + this.gravity
  }

  update(){
    // console.log("updated");
    // console.log(this.velX);
    // console.log(this.velY);
    this.velX *= this.resistance
    this.velY *= this.resistance
    this.velY += this.gravity

    this.x += this.velX
    this.y += this.velY
    this.size *= this.shrink
  }


  exists(){
    if (this.size < 0.4){
      return false
    } else {
      return true
    }
  }

  render() {
    this.context.fillStyle = this.color;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = Particle;
