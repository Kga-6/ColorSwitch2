export class InputHandler{
  constructor(game){
    this.game = game
    this.keys = [];
    this.jumpEvent = false;
    window.addEventListener("keydown", e => {
      console.log(e.key)
      if((
            e.key === " " || 
            e.key === "ArrowUp"
          )
          && this.keys.indexOf(e.key) === -1){
        this.keys.push(e.key)
      }
    })
    window.addEventListener("keyup",e =>{
      if(e.key === " " || e.key === "ArrowUp" || e.key === "q"){
        this.keys.splice(this.keys.indexOf(e.key),1)
      }
    })

    window.addEventListener("keydown",(e)=>{
      //console.log("Player wants to JUMP")
      //this.jumpEvent = true
      if(e.key == "ArrowUp"){
        this.game.player.jump()
      }
    })
    

    window.addEventListener("touchend",(e)=>{
      //this.jumpEvent = true
      this.game.player.jump()
    })

  }
}