const Rocket = require("./rocket");
const Particle = require("./particle");


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
      let xPos = this.x;
      let yPos= this.y;
      let rocket = new Rocket
      (
        xPos,
        yPos,
        this.context,
        this.canvas
      )
      this.rockets = this.rockets.concat(rocket)

    // this.update()
  }

  welcomeFireworks(){
    this.rockets.push(new Rocket(this.x, this.y, this.context, this.canvas))
    this.update()
  }

  getRandomColor(a){
    let r = 0 + Math.round(Math.random() * 225);
    let g = 0 + Math.round(Math.random() * 225);
    let b = 0 + Math.round(Math.random() * 225);
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  clearBoard(){
    this.context.fillStyle = "rgba(0, 0, 0, .05)";
    this.context.fillRect(0,0, canvas.width, canvas.height)
  }

  exists(){
    return this.rockets.length > 0
  }

  update(){
    if (this.particles.length >  1 || this.rockets.length > 0){
      requestAnimationFrame(() => this.update())
    }
    this.rockets.forEach((firework, i) =>{
    let color = this.getRandomColor(1)
    // console.log(color);
      if (firework.exploded()){
        for(let i=0; i < 20; i++){
          this.particles = this.particles.concat(new Particle(firework.x, firework.y, this.context, this.canvas, 3, color))
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
        if (!particle.exists()) {
          this.particles.splice(i, 1)
        }
        particle.render()
        particle.update()
      })
      console.log(this.particles);
    }

  distance(rocketPosX, rocketPosY){
    Math.sqrt(Math.pow(this.x - rocketPosX, 2) + Math.pow(this.y - rocketPosY, 2))
  }

}

// canvas = document.getElementById('canvas')
// ctx = canvas.getContext( '2d' )


let canvas = document.getElementById('canvas')
let ctx = canvas.getContext( '2d' )
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
fireworksArr = []
clearScreen = () =>{
  ctx.fillStyle = "rgba(0, 0, 0, .15)";
  ctx.fillRect(0,0, canvas.width, canvas.height)
  requestAnimationFrame(() => clearScreen())
}

clearScreen()

const oneThird = Math.floor(ctx.canvas.width / 3)

const twoThird = Math.floor(ctx.canvas.width /2 )
const oneWhole = Math.floor(ctx.canvas.width * 2 / 3)

for (let i =0; i < 13; i++){
  new Launch(oneThird, canvas.height, ctx, canvas).welcomeFireworks()
  new Launch(twoThird, canvas.height, ctx, canvas).welcomeFireworks()
  new Launch(oneWhole, canvas.height, ctx, canvas).welcomeFireworks()
}

document.addEventListener("click",
(e) => {
  let xPos = e.clientX;
  let yPos= e.clientY;
  fireworksArr = fireworksArr.filter( firework => {
    return firework.exists()
  })
  for (let i = 0; i < 6; i++){
    var x = new Launch(xPos, canvas.height, ctx, canvas)
      x.addFirework(e)
      x.update()
  }
  // fireworksArr.push(new Launch(xPos, canvas.height, ctx, canvas))
  // fireworksArr.forEach( (firework, i) => {
  //   if (!firework.exists()){
  //     fireworksArr.splice(i, 1)
  //   }
  //   firework.addFirework(e)
  //   if (i === 0){
  //     firework.update()
  //   }
  // } )
  // x.addFirework(e)
  // var x = null
}
)
