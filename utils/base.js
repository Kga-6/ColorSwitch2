export class Base{
  constructor(game){
    this.game = game
    this.width = 200
    this.height = 25
    this.x = this.game.width/2 - this.width/2; 
    this.y = this.game.height - this.height; 
  }
  update(){
    this.y += this.game.objectsVY
  }
  draw(context){
    context.fillStyle = "blue"
    context.fillRect(this.x,this.y,this.width,this.height)
  }
}