class Enemy{
    constructor(){
        this.frameX=0;
        this.frameY=0;
        this.fps=20;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.markedForDeletion=false;

    }
    update(deltaTime){
        this.x-=this.speedX+this.game.speed;
        this.y=Math.min(this.y+this.speedY, this.game.width*0.5);
        this.speedY+=0.52;
        if(this.frameTimer>this.frameInterval){
            this.frameTimer=0;
            this.frameX=(this.frameX+1)%6;
        }
        else {this.frameTimer+=deltaTime;}

        if(this.x+this.width<0){
            this.markedForDeletion=true;
        }

    }
    draw(context){
        context.drawImage(this.image, this.frameX*this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=60;
        this.height=44;
        this.x=this.game.width + Math.random()*this.game.width*0.5;
        this.y=Math.random()*(this.game.height*0.5);
        this.speedX=2*Math.random()+1;
        this.speedY=0;
        this.maxFrame=6;
        this.image=enemyFly;

        this.angle=0;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.speedY=(Math.random()*0.5+1)*Math.sin(this.angle);
        this.angle+=0.05;

    }
}

export class GroundEnemy extends Enemy{

}

export class ClimbingEnemy extends Enemy{

}