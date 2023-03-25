import { Player } from "./utils/player.js" 
import { InputHandler } from "./utils/input.js"
import { Base } from "./utils/base.js"
import { LinearObject , colorSwitch } from "./utils/object.js"

const gameWidth = 400
const mainMenu = document.getElementById("main-menu")
const gameMenu = document.getElementById("game-menu")
const scoreDisplay = document.getElementById("game-score")
const mainScoreDisplay = document.getElementById("score")
const heighScoreDisplay = document.getElementById("heigh-score")
const startBTN = document.getElementById("start-btn")

let heighScore = 0

window.addEventListener("load",function(){
  const canvas = this.document.getElementById("canvas1")
  const ctx = canvas.getContext("2d")

  canvas.width = gameWidth
  canvas.height = window.innerHeight
  mainMenu.style.width = `${gameWidth}px`
  mainMenu.style.height = `${window.innerHeight}px`
  gameMenu.style.width = `${gameWidth}px`
  gameMenu.style.height = `${window.innerHeight}px`

  class Game {
    constructor(width,height){
      this.width = width;
      this.height = height;
      this.objectsVY = 0; // This is what moves all objects vertical
      this.VY = 0 // How far vertical a player got

      this.player = new Player(this); // creates a new player
      this.input = new InputHandler(this); // creates the players input
      this.base = new Base(this)

      this.objects = []; 
      this.newObject = true // If true 8 new objects will be added
      this.colors = ["red","blue","yellow","purple"]
      this.score = 0;
      this.gameOver = false;
    }

    update(){
      this.player.update(this.input)
      this.base.update()
      this.VY += this.objectsVY
      scoreDisplay.textContent = this.score


      // HandleObjects
      if(this.newObject){
        this.newObject = false
        this.addObjects()
      }
      this.objects.forEach((data,index) =>{
        data.Object.update()
        if(data.Object.MarkedForDeletion){
          this.objects.splice(index,1)
        }
      })
      let switchLength = 0
      this.objects.forEach((data,index) =>{
        if(data.Type == "switch"){
          switchLength += 1
        }
      })
      if(switchLength < 3){
        this.newObject = true
      }
    }
  
    draw(context){
      this.player.draw(context)
      this.base.draw(context)

      // HandleObjects
      this.objects.forEach((data,index) =>{
        data.Object.draw(ctx)
      })
    }

    addObjects(){

      this.objects.push({"Type":"colorChange","Object":new colorSwitch(this,0,100)})
      this.objects.push({"Type":"switch","Object":new LinearObject(this,0,0)})

      this.objects.push({"Type":"colorChange","Object":new colorSwitch(this,0,-100)})
      this.objects.push({"Type":"switch","Object":new LinearObject(this,0,-200)})

      this.objects.push({"Type":"colorChange","Object":new colorSwitch(this,0,-300)})
      this.objects.push({"Type":"switch","Object":new LinearObject(this,0,-400)})

      this.objects.push({"Type":"colorChange","Object":new colorSwitch(this,0,-500)})
      this.objects.push({"Type":"switch","Object":new LinearObject(this,0,-600)})

      this.objects.push({"Type":"colorChange","Object":new colorSwitch(this,0,-700)})
      this.objects.push({"Type":"switch","Object":new LinearObject(this,0,-800)})

    }
  }

  // Create a new game
  let game = null
  function animate(){
    if(game.gameOver == false){
      mainMenu.style.display = "none"
      gameMenu.style.display = "block"
      game.update()
      ctx.clearRect(0,0,canvas.width,canvas.height)
      game.draw(ctx)
      requestAnimationFrame(animate)
    }else{

      if(game.score >= heighScore){
        heighScore = game.score
      }
      heighScoreDisplay.textContent = `Best Score: ${heighScore}`
      mainScoreDisplay.textContent = `Score: ${game.score}`
      
      ctx.clearRect(0,0,canvas.width,canvas.height)
      game = null
      mainMenu.style.display = "block"
      gameMenu.style.display = "none"

    }
  }
  function start(){
    if(game == null){

      canvas.width = gameWidth
      canvas.height = window.innerHeight
      mainMenu.style.width = `${gameWidth}px`
      mainMenu.style.height = `${window.innerHeight}px`
      gameMenu.style.width = `${gameWidth}px`
      gameMenu.style.height = `${window.innerHeight}px`

      game = new Game(canvas.width,canvas.height)
      animate()
    }
  }

  startBTN.addEventListener("click",()=>{
    start()
  })

})