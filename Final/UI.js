export class UI{
    constructor(game){
        this.game=game;
        this.fontSize=30;
        this.fontFamily='Gotham Medium';

    }
    draw(context){
        context.font=this.fontSize+'px '+this.fontFamily;
        context.textAlign='left';
        context.fillStyle=this.game.fontColor;

        //scoreUI
        context.fillText('Score: '+this.game.score, 20, 50);

        //timerUI
        context.font=this.fontSize*0.8+'px '+this.fontFamily;
        context.fillText('Time: '+(this.game.time*0.001).toFixed(1), 20, 80);

        //gameOver
        if(this.game.gameOver){
            context.textAlign='center';
            context.font=this.fontSize*2+'px '+this.fontFamily;
            context.fillText('GAME OVER', this.game.width*0.5, this.game.height*0.5)
;
        }
    }
}