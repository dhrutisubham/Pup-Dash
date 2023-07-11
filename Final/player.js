/** @type {HTMLCanvasElement} */
import { Sitting, Running, Jumping, Falling } from './playerStates.js' 

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
        this.maxFrame=5;
        this.fps=20;
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        

        this.speed=0;
        this.maxSpeed=10;

        this.vSpeed=0;
        this.mass=1;

        this.states=[new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
        this.currentState=this.states[0];
        this.currentState.enter();

    }
    update(input, deltaTime){

        this.currentState.handleInput(input);

        //running
        this.x+=this.speed;
        if(input.includes('ArrowRight')) this.speed=this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed=-this.maxSpeed;
        // else if(this.onGround())this.speed=0;
        else this.speed=0;
        this.x=Math.max(this.x, 0);
        this.x=Math.min(this.x, this.game.width-this.width);

        //jumping
        this.y+=this.vSpeed;
        this.y=Math.max(this.y, 0);
        this.y=Math.min(this.y, this.game.height-this.height);

        if(!this.onGround()) this.vSpeed+=this.mass;

        //animation
        if(this.frameTimer>this.frameInterval){
            this.frameX=(this.frameX+1)%this.maxFrame;
            this.frameTimer=0;
        }
        else {
            this.frameTimer+=deltaTime;
        }

    }
    draw(context){

        context.drawImage(this.image, this.frameX*this.width, this.frameY*this.height, this.width, this.height, this.x, this.y, this.width, this.height);

    }
    onGround(){
        return this.y>=this.game.height-this.height;
    }
    setState(state){
        this.currentState=this.states[state];
        this.currentState.enter();
    }
}