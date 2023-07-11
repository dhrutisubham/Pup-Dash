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
        if(this.frameTimer>this.frameInterval){
            this.frameTimer=0;
            this.frameX=(this.frameX+1)%this.maxFrame;
        }
        else {this.frameTimer+=deltaTime;}

        if(this.x+this.width<0){
            this.markedForDeletion=true;
        }

    }
    draw(context){
        context.drawImage(this.image, this.frameX*this.width, 0, this.width, this.height, this.x, this.y, this.width*this.size, this.height*this.size);
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
        this.size=1;

        this.angle=0;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.speedY=(Math.random()*0.5+1)*Math.sin(this.angle);
        this.y=Math.min(this.y+this.speedY, this.game.width*0.5);

        this.angle+=0.05;

    }
}

export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=61;
        this.height=87;
        this.x=this.game.width;
        this.y=this.game.height-this.game.groundMargin-this.height;
        this.image=enemyPlant;
        this.speedX=0;
        this.speedY=0;
        this.maxFrame=2;
        this.size=1;
    }
    update(deltaTime){
        super.update(deltaTime);
    }
    draw(context){
        super.draw(context);
    }
}

export class ClimbingEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.size=0.5+Math.random()*0.5;
        this.width=120;
        this.height=144;
        this.x=this.game.width;
        this.y=Math.random()*this.game.height*0.5;
        this.image=enemyBigSpider;
        this.speedX=0;
        this.speedY=(Math.random()>0.5)? 1:-1;
        this.maxFrame=6;
        this.size=0.5+0.5*Math.random();
    }
    update(deltaTime){
        super.update(deltaTime);
        this.y-=this.speedY;
        if(this.y>this.game.height-this.game.groundMargin-this.height+10){
            this.speedY*=-1;
        }
        if(this.y+this.height<0) this.markedForDeletion=true;

    }
    draw(context){
        super.draw(context);
        context.fillStyle='white';
        context.beginPath();
        context.moveTo(this.x+this.size*this.width/2, 0);
        context.lineTo(this.x+this.size*this.width/2, this.y+50);
        context.stroke();
    }

}