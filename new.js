/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Rocket = __webpack_require__(1);
	const Particle = __webpack_require__(2);
	
	class Launch {
	  constructor(x, y, ctx, canvas) {
	    this.rockets = [];
	    this.particles = [];
	    this.context = ctx;
	    this.canvas = canvas;
	    this.x = x;
	    this.y = y;
	  }
	
	  addFirework(e) {
	    e.preventDefault();
	    let xPos = this.x;
	    let yPos = this.y;
	    let rocket = new Rocket(xPos, yPos, this.context, this.canvas);
	    this.rockets = this.rockets.concat(rocket);
	
	    // this.update()
	  }
	
	  welcomeFireworks() {
	    this.rockets.push(new Rocket(this.x, this.y, this.context, this.canvas));
	    this.update();
	  }
	
	  getRandomColor(a) {
	    let r = 0 + Math.round(Math.random() * 225);
	    let g = 0 + Math.round(Math.random() * 225);
	    let b = 0 + Math.round(Math.random() * 225);
	    return `rgba(${r}, ${g}, ${b}, ${a})`;
	  }
	
	  clearBoard() {
	    this.context.fillStyle = "rgba(0, 0, 0, .05)";
	    this.context.fillRect(0, 0, canvas.width, canvas.height);
	  }
	
	  exists() {
	    return this.rockets.length > 0;
	  }
	
	  update() {
	    if (this.particles.length > 1 || this.rockets.length > 0) {
	      requestAnimationFrame(() => this.update());
	    }
	    this.rockets.forEach((firework, i) => {
	      let color = this.getRandomColor(1);
	      // console.log(color);
	      if (firework.exploded()) {
	        for (let i = 0; i < 20; i++) {
	          this.particles = this.particles.concat(new Particle(firework.x, firework.y, this.context, this.canvas, 3, color));
	        }
	        this.rockets.splice(i, 1);
	      }
	      firework.render();
	      firework.update();
	    });
	    // console.log(this.particles);
	    this.particles = this.particles.filter(particle => {
	      return particle.exists();
	    });
	    // console.log(this.particles);
	    this.particles.forEach((particle, i) => {
	      if (!particle.exists()) {
	        this.particles.splice(i, 1);
	      }
	      particle.render();
	      particle.update();
	    });
	    console.log(this.particles);
	  }
	
	  distance(rocketPosX, rocketPosY) {
	    Math.sqrt(Math.pow(this.x - rocketPosX, 2) + Math.pow(this.y - rocketPosY, 2));
	  }
	
	}
	
	// canvas = document.getElementById('canvas')
	// ctx = canvas.getContext( '2d' )
	
	
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	fireworksArr = [];
	clearScreen = () => {
	  ctx.fillStyle = "rgba(0, 0, 0, .15)";
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	  requestAnimationFrame(() => clearScreen());
	};
	
	clearScreen();
	
	const oneThird = Math.floor(ctx.canvas.width / 3);
	
	const twoThird = Math.floor(ctx.canvas.width / 2);
	const oneWhole = Math.floor(ctx.canvas.width * 2 / 3);
	
	for (let i = 0; i < 13; i++) {
	  new Launch(oneThird, canvas.height, ctx, canvas).welcomeFireworks();
	  new Launch(twoThird, canvas.height, ctx, canvas).welcomeFireworks();
	  new Launch(oneWhole, canvas.height, ctx, canvas).welcomeFireworks();
	}
	
	document.addEventListener("click", e => {
	  let xPos = e.clientX;
	  let yPos = e.clientY;
	  fireworksArr = fireworksArr.filter(firework => {
	    return firework.exists();
	  });
	  for (let i = 0; i < 6; i++) {
	    var x = new Launch(xPos, canvas.height, ctx, canvas);
	    x.addFirework(e);
	    x.update();
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
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	class Rocket {
	  constructor(x, y, context, canvas) {
	    this.x = x;
	    this.y = y;
	    this.shrink = .999;
	    this.size = 4;
	
	    this.resistance = 0.99;
	    this.gravity = 0.07;
	
	    this.flick = false;
	
	    this.alpha = 1;
	    this.fade = 0;
	    this.color = 0;
	
	    this.context = context;
	    this.canvas = canvas;
	    this.velX = Math.random() * 6 - 3;
	    this.velY = Math.random() * -4 * (y / 320) - 6.5;
	  }
	
	  update() {
	
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
	
	  exploded() {
	    if (this.velY >= 0) {
	      return true;
	    } else {
	      return false;
	    }
	  }
	
	  render() {
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	class Particle {
	  constructor(x = 0, y = 0, ctx, canvas, radius, color) {
	    this.x = x;
	    this.y = y;
	    this.gravity = 0.2;
	    this.resistance = 0.92;
	    this.context = ctx;
	    this.canvas = canvas;
	    this.posX = this.canvas.width / 2;
	    this.posY = this.canvas.height;
	    let angle = Math.random() * Math.PI * 2;
	    let speed = Math.cos(Math.random() * Math.PI / 2) * 15.7;
	    // console.log(speed);
	    this.velX = Math.cos(angle) * speed + 0.5;
	    this.velY = Math.sin(angle) * speed;
	    this.radius = radius;
	    this.size = 5.5;
	    this.shrink = .960;
	    this.color = color;
	  }
	
	  velX() {
	    return Math.cos(this.angle) * this.speed;
	  }
	
	  velY() {
	    return Math.cos(this.angle) * this.speed + this.gravity;
	  }
	
	  update() {
	    // console.log("updated");
	    // console.log(this.velX);
	    // console.log(this.velY);
	    this.velX *= this.resistance;
	    this.velY *= this.resistance;
	    this.velY += this.gravity;
	
	    this.x += this.velX;
	    this.y += this.velY;
	    this.size *= this.shrink;
	  }
	
	  exists() {
	    if (this.size < 0.4) {
	      return false;
	    } else {
	      return true;
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

/***/ }
/******/ ]);
//# sourceMappingURL=new.js.map