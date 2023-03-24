export class colorSwitch{
  constructor(game,x,y){
    this.game = game;
    this.width = 15;
    this.height = 15;
    this.x = this.game.width/2 - this.width/2;
    this.y = y;
    this.MarkedForDeletion = false;
  }
  update(){
    this.y += this.game.objectsVY
  }
  draw(context){
    context.beginPath();
    context.arc(
        this.x,
        this.y-this.game.base.height, // Place the player on top on the base
        this.width, 
        0, 
        2 * Math.PI
    );
    context.fillStyle = "white";
    context.fill();
    context.stroke();
  }
}

class linearChild{
  constructor(x,y,width,color,parent){
    this.parent = parent
    this.x = x;
    this.y = y;
    this.width = width
    this.height = this.parent.height
    this.color = color
  }
  update(){
    this.y += this.parent.game.objectsVY

    if(this.parent.direction == "left"){
      this.x += this.parent.speed
      if(this.x > this.parent.game.width){
        this.x = -this.width*4
      }
    }else{
      this.x -= this.parent.speed
      if(this.x < -this.width){
        this.x = this.width*7
      }
    }

  }
  draw(context){
    context.fillStyle = this.color
    context.fillRect(this.x,this.y,this.width,this.parent.height)
  }
}
export class LinearObject{
  constructor(game,x,y){
    this.game = game;
    this.height = 15
    this.width = this.game.width/this.game.colors.length
    this.x = x;
    this.y = y;
    this.speed = 0.2;
    this.child = [];
    this.loaded = false;
    this.direction =  Math.random() <= 0.5 ? "left" : "right";
    this.MarkedForDeletion = false;
  }
  update(){
    this.y += this.game.objectsVY
    // HandleChildrens
    this.child.forEach(child => {
      child.update()
    })
    //check if off screen
    if(this.y >= this.game.height - 20){
      this.MarkedForDeletion = true
    }
  }
  draw(context){

    // HandleChildrens
    if(this.loaded == false){
      this.loaded = true



      if(this.direction == "left"){
         // -
        this.child.push(new linearChild(-this.width,this.y,this.width,"purple",this))
        this.child.push(new linearChild(-this.width*2,this.y,this.width,"yellow",this))
        this.child.push(new linearChild(-this.width*3,this.y,this.width,"blue",this))
        this.child.push(new linearChild(-this.width*4,this.y,this.width,"red",this))
        // +
        this.child.push(new linearChild(0,this.y,this.width,"red",this))
        this.child.push(new linearChild(this.width,this.y,this.width,"blue",this))
        this.child.push(new linearChild(this.width*2,this.y,this.width,"yellow",this))
        this.child.push(new linearChild(this.width*3,this.y,this.width,"purple",this))
      }else{
         // -
        this.child.push(new linearChild(this.width*4,this.y,this.width,"red",this))
        this.child.push(new linearChild(this.width*5,this.y,this.width,"blue",this))
        this.child.push(new linearChild(this.width*6,this.y,this.width,"yellow",this))
        this.child.push(new linearChild(this.width*7,this.y,this.width,"purple",this))
        // +
        this.child.push(new linearChild(0,this.y,this.width,"red",this))
        this.child.push(new linearChild(this.width,this.y,this.width,"blue",this))
        this.child.push(new linearChild(this.width*2,this.y,this.width,"yellow",this))
        this.child.push(new linearChild(this.width*3,this.y,this.width,"purple",this))
      }
    }
    this.child.forEach(child => {
      child.draw(context)
    })
  }
}