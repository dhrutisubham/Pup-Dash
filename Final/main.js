import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";

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
            this.bg=new Background(this);
            this.player=new Player(this);
            this.input=new InputHandler();
            this.speed=0;
            this.maxSpeed=3;
        }

        update(deltaTime){
            this.bg.update();
            this.player.update(this.input.keys, deltaTime);
        }
        draw(context){
            this.bg.draw(context);
            this.player.draw(context);
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
        

        requestAnimationFrame(animate);
    }
    animate(0);

});