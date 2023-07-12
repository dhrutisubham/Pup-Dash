import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy} from "./enemies.js";
import { UI } from "./UI.js";
import { Dust } from "./particles.js";


/**@type {HTMLCanvasElement} */

window.addEventListener('load', function(){
    const canvas= document.getElementById('canvas1');
    const ctx= canvas.getContext('2d');
    canvas.width=500;
    canvas.height=500;

    class Game{
        constructor(width, height){
            
            this.width=width;
            this.height=height;
            this.groundMargin=80;

            this.time=0;
            this.maxTime=200000;
            this.gameOver=false;

            this.enemies=[];
            this.enemyTimer=0;
            this.enemyInterval=1000;

            this.particles=[];
            this.collisions=[];

            this.speed=0;
            this.maxSpeed=3;

            this.score=0;
            this.fontColor='#000000DF';

            this.debug=false;
            this.maxParticles=50;            

            this.bg=new Background(this);
            this.player=new Player(this);
            this.input=new InputHandler(this);
            this.UI=new UI(this);

            this.player.currentState=this.player.states[0];
            this.player.currentState.enter();

        }

        update(deltaTime){
            this.time+=deltaTime;
            console.log(this.time);
            if(this.time>this.maxTime) this.gameOver=true;

            this.bg.update();
            this.player.update(this.input.keys, deltaTime);

            //enemies
            if(this.enemyTimer>this.enemyInterval){
                this.addEnemy();
                this.enemyTimer=0;
            }
            else{
                this.enemyTimer+=deltaTime;
            }

            this.enemies.forEach(enemy=>{
                enemy.update(deltaTime);
                if(enemy.markedForDeletion){
                    this.enemies.splice(this.enemies.indexOf(enemy),1 );
                }
            });

            //particles
            this.particles.forEach((enemy,index)=>{
                enemy.update();
                if(enemy.markedForDeletion){
                    this.particles.splice(index,1);
                }
            });
            if(this.particles.length>this.maxParticles){
                this.particles=this.particles.slice(0, this.maxParticles);
            }

            //collisions
            this.collisions.forEach((enemy,index)=>{
                enemy.update(deltaTime);
                if(enemy.markedForDeletion){
                    this.collisions.splice(index,1);
                }
            });
            console.log(this.particles);
            console.log(this.enemies);
            console.log(this.collisions);
        }
        draw(context){
            this.bg.draw(context);
            this.player.draw(context);

            this.enemies.forEach(enemy=>{
                enemy.draw(context);
            });

            this.particles.forEach(particle=>{
                particle.draw(context);
            });

            this.collisions.forEach(collision=>{
                collision.draw(context);
            });

            this.UI.draw(context);
        }
        addEnemy(){
            if(this.speed>0 && Math.random()>0.5) this.enemies.push(new GroundEnemy(this));
            else if(this.speed>0){
                this.enemies.push(new ClimbingEnemy(this));
            }
            
            this.enemies.push(new FlyingEnemy(this));
        }
    }
    const game=new Game(canvas.width, canvas.height);

    let lastAnimate=0;

    function animate(timeStamp){
        const timeDiff=timeStamp-lastAnimate;
        lastAnimate=timeStamp;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(timeDiff);
        game.draw(ctx);
        
        if(!game.gameOver){
            requestAnimationFrame(animate);
        }
        else{

        }
    }
    animate(0);

});