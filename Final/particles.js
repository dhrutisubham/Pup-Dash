/**@type {HTMLCanvasElement} */

class Particle{
    constructor(game){
        this.game=game;
        this.markedForDeletion=false;

        this.speedX=1;
        this.speedY=1;

    }
    update(){
        this.x-=this.speedX+this.game.speed;
        this.y-=this.speedY;
        this.size*=0.95;
        if(this.size<0.5) this.markedForDeletion=true;
    }
}

export class Dust extends Particle{
    constructor(game, x, y){
        super(game);
        this.size=Math.random()*10+10;
        this.x=x+this.size+this.game.player.width*0.4;
        this.y=y+this.game.player.height-this.size;
        this.speedX=Math.random()+1;
        this.speedY=Math.random()*2;
        this.color='#00000040';
    }
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI*2);
        context.fillStyle=this.color;
        context.fill();
    }
}

export class Splash extends Particle{
    constructor(game, x, y){
        super(game);
        this.game=game;
        this.size=Math.random()*100+50;
        this.x=x;
        this.y=y;
        this.speedX=Math.random()*6-3;
        this.speedY=Math.random()*2+2;
        this.mass=0;
        this.image=fire;

    }
    update(){
        super.update();
        this.mass+=0.1;
        this.y+=this.mass;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.size, this.size);

    }
    
}

export class Fire extends Particle{
    constructor(game, x, y){
        super(game);
        this.image=fire;
        this.size=Math.random()*100+50;
        this.x=x-this.game.player.width*0.5;
        this.y=y-this.game.player.height*0.3;
        this.speedX=1;
        this.speedY=1;
        this.angle=0;
        this.va=Math.random()*0.2-0.1;
    }
    update(){
        super.update();
        this.angle+=this.va;  
        this.x+=Math.sin(this.angle*5); 
    }
    draw(context){
        context.save();

        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, 0, 0, this.size, this.size);
        
        context.restore();
    }
    
}