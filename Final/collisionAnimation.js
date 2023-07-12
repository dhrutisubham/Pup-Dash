export class CollisionAnimation{
    constructor(game, x, y){
        this.game=game;
        this.image=collision;
        this.spriteWidth=100;
        this.spriteHeight=90;
        this.sizeMod=Math.random()+0.5;
        this.width=this.sizeMod*this.spriteWidth;
        this.height=this.sizeMod*this.spriteHeight;
        this.x=x-this.width*0.5;
        this.y=y-this.height*0.5;
        this.frameX=0;
        this.frameY=0;
        this.maxFrame=4;
        this.markedForDeletion=false;

        this.collTimer=0;
        this.collInterval=200;
    }
    update(deltaTime){
        this.x-=this.game.speed;
        if(this.collTimer>=this.collInterval){
        if(this.frameX===this.maxFrame-1) this.markedForDeletion=true;
        this.frameX++;
        this.collTimer=0;
        }
        else {
            this.collTimer+=deltaTime;
        }
    }
    draw(context){
        context.drawImage(this.image, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}