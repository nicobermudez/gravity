const {Engine, Render, Bodies, World, MouseConstraint, Composites, Query} = Matter

const sectionTag = document.querySelector("section.shapes")

const w = window.innerWidth
const h = window.innerHeight

const engine = Engine.create()
const renderer = Render.create({
  element: sectionTag,
  engine: engine,
  options: {
    height: h,
    width: w,
    background: "#000",
    wireframes: false,
    pixelRatio: window.devicePixelRatio
  }
})

const createShape = function (x, y) {
  const randomNum = Math.random()
  return Bodies.rectangle(x, y, 32, 32, {
      render: {
        sprite: {
          texture: "football-2-.png",
          xScale: 0.5,
          yScale: 0.5
        }
      }
  })  
}

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w/4, h/4), {
  isStatic: true,
  render: {
    fillStyle: "#ffffff"
  }
})

const wallOptions = {
  isStatic: true,
  render: {
    visible: false
  }
}

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions)
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)

const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
  constraint: {
    render: {
      visible: false
    }
  }
})

const initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, function (x, y) {
  return createShape(x, y)
})


World.add(engine.world, [
  bigBall, 
  ground,
  ceiling,
  leftWall,
  rightWall,
  mouseControl,
  initialShapes
])



document.addEventListener("click", function (event) {
  const shape = createShape(event.pageX, event.pageY)
  World.add(engine.world, shape)
})

Engine.run(engine)
Render.run(renderer)

// let time = 0
// const changeGravity = function () {
//   time = time + 0.001
//
//   engine.world.gravity.x = Math.sin(time)
//   engine.world.gravity.y = Math.cos(time)
//  
//   requestAnimationFrame(changeGravity)
// }
//
// changeGravity()

window.addEventListener("deviceorientation", function (event) {
  engine.world.gravity.x = event.gamma / 30
  engine.world.gravity.y = event.beta / 30
})
