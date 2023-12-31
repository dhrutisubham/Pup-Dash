/** @type {HTMLCanvasElement} */
import { Sitting, Running, Jumping, Falling, Rolling, Diving, Hit } from './playerStates.js' 
import { CollisionAnimation } from './collisionAnimation.js';
import { FloatingMessages } from './floatingMessages.js';

export class Player{
    constructor(game){
        this.game=game;
        this.width=100;
        this.height=91.5;
        this.x=0;
        this.y=this.game.height-this.height-this.game.groundMargin;

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

        this.states=[new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
        

    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);

        //running
        this.x+=this.speed;
        if((input.includes('ArrowRight') || input.includes('d'))&& this.currentState!=this.states[6]) this.speed=this.maxSpeed;
        else if ((input.includes('ArrowLeft') || input.includes('a')) && this.currentState!=this.states[6]) this.speed=-this.maxSpeed;
        // else if(this.onGround())this.speed=0;
        else this.speed=0;
        this.x=Math.max(this.x, 0);
        this.x=Math.min(this.x, this.game.width-this.width);

        //jumping
        this.y+=this.vSpeed;
        this.y=Math.max(this.y, -30);
        this.y=Math.min(this.y, this.game.height-this.height-this.game.groundMargin);

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

        if(this.game.debug){
            context.strokeRect(this.x, this.y, this.width, this.height);
        }

        context.drawImage(this.image, this.frameX*this.width, this.frameY*this.height, this.width, this.height, this.x, this.y, this.width, this.height);

    }
    onGround(){
        return this.y>=this.game.height-this.height-this.game.groundMargin;
    }
    setState(state, speed){
        this.currentState=this.states[state];
        this.game.speed=speed*this.game.maxSpeed;
        this.currentState.enter();
    }

    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if(
                enemy.x<this.x+this.width 
                && enemy.x+enemy.width>this.x
                && enemy.y<this.y+this.height 
                && enemy.y+enemy.height>this.y                
            ){
                this.game.collisions.unshift(new CollisionAnimation(this.game, enemy.x+enemy.width*0.5, enemy.y+enemy.height*0.5));
                enemy.markedForDeletion=true;
                if(this.currentState===this.states[4] || this.currentState===this.states[5])
                {
                    this.game.score++;
                    this.game.floatingMessages.unshift(new FloatingMessages('+1', enemy.x+enemy.width*0.5, enemy.y+enemy.height*0.5, 20, 50));
                    console.log(this.game.floatingMessages);
                }
                else{
                    this.setState(6, 0);
                    
                    this.game.totalLives--;
                    if(!this.game.totalLives){
                        this.game.gameOver=true;
                    } 
                }
            }
        });
    }
}