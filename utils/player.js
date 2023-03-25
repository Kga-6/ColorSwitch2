export class Player {
  constructor(game){
    this.game = game; // game
    this.width = 15; // player width
    this.height = 15; // player height
    this.x = this.game.width/2 - this.width/2; // center player x
    this.y = this.game.height - this.height; // place player at the bottom 
    this.image
    this.color = "red"

    // new system
    this.velocity = 0
    this.gravity = 0.175
    this.lift = -10;

    this.fallingSpeed = 0.15
    this.fallingMax = 2

    // new jump system
    this.jumpGoal = 50
    this.jumpHeight = 0
    this.oldY = this.y
  }

  switchColor(){
    switch(this.color){
      case "red":
        this.color = "blue"
        break
      case "blue":
        this.color = "yellow"
        break
      case "yellow":
        this.color = "purple"
        break
      case "purple":
        this.color = "red"
        break
    }

  }
  jump(){
    this.velocity += this.lift;
    
     // Update ObjectVY
    if(this.y <= this.game.height/2){
      const testV = this.y-this.game.height/2 // Amount we should bring objects down
      this.game.objectsVY += 0.5;//Math.abs(testV/100)
    }else{
      this.game.objectsVY = 0
    }
  }
  update(input){

    this.velocity += this.gravity;
    this.velocity *= 0.9; // Air resistance
    this.y += this.velocity;

    if(this.y >= this.game.height/2){
      this.game.objectsVY = 0
    }

    // Base check
    if(this.y >= this.game.height - this.height ){ // Check if player if lower then canvas height
      if(this.game.VY >= this.game.base.height){ // Check if the base is still visible
        //this.y += this.fallingSpeed // Makes the player fall
      }else{
        this.y = this.game.height - this.height  // Places the player back to the base
      }
    }

    this.checkCollisions()

    // New Vertical Movement
    /*if(input.jumpEvent == true){
      this.fallingSpeed = 0.1 // reset player falling speed
      
      // Update ObjectVY
      if(this.y <= this.game.height/2){
        const testV = this.y-this.game.height/2 // Amount we should bring objects down
        this.game.objectsVY = Math.abs(testV/50)
      }else{
        this.game.objectsVY = 0
      }

      this.jumpHeight += 0.075
      this.y -= this.jumpHeight // Makes the player fly

      const differ = this.oldY - this.y
      if(differ >= this.jumpGoal){
        input.jumpEvent = false
        this.jumpHeight = 0
        console.log("Jump conplated")
      }

    }else if(input.jumpEvent == false){
      this.oldY = this.y
      this.game.objectsVY = 0 // Reset ObjectsVY
      this.fallingSpeed += 0.01
      if(this.fallingSpeed >= this.fallingMax){
        this.fallingSpeed = this.fallingMax
      }


      if(this.y >= this.game.height - this.height ){ // Check if player if lower then canvas height

        if(this.game.VY >= this.game.base.height){ // Check if the base is still visible
          this.y += this.fallingSpeed // Makes the player fall
        }else{
          this.y = this.game.height - this.height  // Places the player back to the base
        }

      }else{
        this.y += this.fallingSpeed // Makes the player fall
      }
    }*/

    // Old Vertical Movement
    /*if(input.keys.includes(" ") || input.keys.includes("ArrowUp")){
      this.fallingSpeed = 0.15

      // Update ObjectVY
      if(this.y <= this.game.height/2){
        const testV = this.y-this.game.height/2 // Amount we should bring objects down
        this.game.objectsVY = Math.abs(testV/100)
      }else{
        this.game.objectsVY = 0
      }

      if(this.y <= this.game.height/2 - 20){
        this.y -= 1.5 // Makes the player fly
      }else{
        this.y -= 2.5 // Makes the player fly
      }

    }else{
      this.game.objectsVY = 0 // Reset ObjectsVY
      this.fallingSpeed += 0.05


      if(this.y >= this.game.height - this.height ){ // Check if player if lower then canvas height

        if(this.game.VY >= this.game.base.height){ // Check if the base is still visible
          this.y += this.fallingSpeed // Makes the player fall
        }else{
          this.y = this.game.height - this.height  // Places the player back to the base
        }

      }else{
        this.y += this.fallingSpeed // Makes the player fall
      }
    }*/

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
    context.fillStyle = this.color;
    context.fill();
    context.stroke();

  }
  checkCollisions(){

    this.game.objects.forEach((data,index) => {

      if(data.Type == "switch"){
        data.Object.child.forEach(child => {
          if(
            child.x < this.x + this.width &&
            child.x + child.width > this.x &&
            child.y < this.y + this.height &&
            child.y + child.height > this.y
          ){
            if(this.color != child.color){
              this.game.gameOver = true
            }
          }
        })
      }else if(data.Type == "colorChange"){
        if(
          data.Object.x < this.x + this.width &&
          data.Object.x + data.Object.width > this.x &&
          data.Object.y < this.y + this.height &&
          data.Object.y + data.Object.height > this.y
        ){
          data.Object.MarkedForDeletion = true
          this.switchColor()
          this.game.score += 1
        }
      }

    });
  }
}