/** @type {HTMLCanvasElement} */
export class Player{
    constructor(game){
        this.game=game;
        this.width=100;
        this.height=91.3;
        this.x=0;
        this.y=this.game.height-this.height;

        this.image=document.getElementById('player');
        this.frameX=0;
        this.frameY=0;
        this.spriteWidth=626;
        this.spriteHeight=523;

        this.speed=0;
        this.maxSpeed=10;

        this.vSpeed=0;
        this.mass=1;



    }
    update(input){
        //running
        this.x+=this.speed;
        if(input.includes('ArrowRight')) this.speed=this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed=-this.maxSpeed;
        else this.speed=0;
        this.x=Math.max(this.x, 0);
        this.x=Math.min(this.x, this.game.width-this.width);

        //jumping
        this.y+=this.vSpeed;
        if(input.includes('ArrowUp') && this.onGround()) this.vSpeed-=20;
        this.y=Math.max(this.y, 0);
        this.y=Math.min(this.y, this.game.height-this.height);

        if(!this.onGround()) this.vSpeed+=this.mass;

    }
    draw(context){

        context.drawImage(this.image, this.frameX*this.spriteWidth, this.frameY*this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);

    }
    onGround(){
        return this.y>=this.game.height-this.height;
    }
}