class Particle {
  constructor(x = 0, y = 0, ctx, canvas, radius){
    this.x = x
    this.y = y
    this.gravity = 0.2
    this.resistance = 0.92
    this.context = ctx
    this.canvas = canvas
    this.posX = this.canvas.width / 2
    this.posY = this.canvas.height
    let angle = Math.random() * Math.PI * 2
    let speed = Math.cos(Math.random() * Math.PI / 2) * 15
    // console.log(speed);
    this.velX = Math.cos(angle) * speed + 0.5;
    this.velY = Math.sin(angle) * speed;
    this.radius = radius
    this.size = 3
    this.shrink = .980
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

  style(){
    c.save();
    c.globalCompositeOperation = 'lighter'
  }

  exists(){
    if (this.size < 0.4){
      return false
    } else {
      return true
    }
  }

  render() {
    // console.log("drawn");
    this.context.fillStyle = 'white';

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    this.context.closePath();
    this.context.fill();

    this.context.restore();
  }
}


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
    this.velY = Math.random() * -3 * 4 - 6.5;
  }

  update(){

    this.velX *= this.resistance;
    this.velY *= this.resistance;

    // gravity down
    this.velY += this.gravity;
    console.log(this.velY);
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


class Launch {
  constructor(x, y, ctx, canvas){
    this.rockets=[]
    this.particles = []
    this.context = ctx
    this.canvas = canvas
    this.x = x
    this.y = y
  }

  addFirework(e){
    e.preventDefault()
    let xPos = e.clientX;
    let yPos= e.clientY;
    let rocket = new Rocket
      (
         xPos,
         yPos,
         this.context,
         this.canvas
       )
    this.rockets.push(rocket)
    this.update()
  }

  clearCanvas(){
    this.context.fillStyle = "rgba(0, 0, 0, 0.02)";
    this.context.fillRect(0,0, canvas.width, canvas.height)
  }

  update(){
    requestAnimationFrame(() => this.update())
    this.context.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.context.fillRect(0,0, canvas.width, canvas.height)
    this.rockets.forEach((firework, i) =>{
      if (firework.exploded()){
        for(let i=0; i < 20; i++){
          this.particles = this.particles.concat(new Particle(firework.x, firework.y, this.context, this.canvas, 1))
        }
        this.rockets.splice(i, 1)
      }
        firework.render()
        firework.update()
      })
      // console.log(this.particles);
      this.particles = this.particles.filter( (particle) => {
        return particle.exists()
      })
      // console.log(this.particles);
      this.particles.forEach((particle, i) => {
        particle.render()
        particle.update()
      })
    }

  distance(rocketPosX, rocketPosY){
    Math.sqrt(Math.pow(this.x - rocketPosX, 2) + Math.pow(this.y - rocketPosY, 2))
  }

}

canvas = document.getElementById('canvas')
ctx = canvas.getContext( '2d' )

document.addEventListener("click",
(e) => {
  let x = new Launch(250, 250, ctx, canvas)
  x.addFirework(e)
}
)
// setInterval(() =, 80)
