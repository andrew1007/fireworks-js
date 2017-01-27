class Rocket {
  constructor(x, y, context, canvas){
    this.x = x
    this.y = y
    this.shrink = .999;
    this.size = 4;

    this.resistance = 0.99;
    this.gravity = 0.07

    this.flick = false;

    this.alpha = 1;
    this.fade = 0;
    this.color = 0;

    this.context = context
    this.canvas = canvas
    this.velX = Math.random() * 6 - 3;
    this.velY = Math.random() * -4 * (y / 320) - 6.5;
  }

  update(){

    this.velX *= this.resistance;
    this.velY *= this.resistance;

    // gravity down
    this.velY += this.gravity;
    // update position based on speed
    this.x += this.velX;
    this.y += this.velY;

    // // shrink
    // this.size *= this.shrink;
    //
    // // fade out
    // this.alpha -= this.fade;
  }

  exploded(){
    if (this.velY >= 0){
      return true
    } else{
      return false
    }
  }

  render(){
    // this.context.save();

    // this.context.globalCompositeOperation = 'lighter';

    // var x = this.pos.x,
    //     y = this.pos.y,
    //     r = this.size / 2;
    //
    // var gradient = this.context.createRadialGradient(x, y, 0.1, x, y, r);
    // gradient.addColorStop(0.1, "rgba(255, 255, 255 ," + this.alpha + ")");
    // gradient.addColorStop(1, "rgba(0, 0, 0, " + this.alpha + ")");

    this.context.fillStyle = 'white';

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}

module.exports = Rocket;
