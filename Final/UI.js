export class UI{
    constructor(game){
        this.game=game;
        this.fontSize=30;
        this.fontFamily='Staatliches';
        this.lives=lives;

    }
    draw(context){
        context.save();
        context.shadowOffsetX=0;
        context.shadowOffsetY=2;
        context.shadowColor='black';
        context.shadowBlur=2;
        context.font=this.fontSize+'px '+this.fontFamily;
        context.textAlign='left';
        context.fillStyle=this.game.fontColor;

        //scoreUI
        context.fillText('Score: '+this.game.score, 20, 50);

        //timerUI
        context.font=this.fontSize*0.8+'px '+this.fontFamily;
        context.fillText('Time: '+(this.game.time*0.001).toFixed(1), 20, 80);

        //lives
        context.shadowOffsetX=0;
        context.shadowOffsetY=2;
        context.shadowColor='white';
        context.shadowBlur=19;
        for(let i=0; i<this.game.totalLives; i++){
        context.drawImage(this.lives, 20+i*30, 95, 25, 25);
        }
        context.restore();
        //gameOver
        if(this.game.gameOver){
            context.fillStyle='#FFFFFF'
            context.fillRect(0, this.game.height*0.5-this.fontSize*1.5, this.game.width, this.fontSize*3)
            context.fillStyle='#C21807';
            // context.shadowOffsetX=0;
            // context.shadowOffsetY=4;
            // context.shadowColor='white';
            // context.shadowBlur=50;

            context.textAlign='center';
            context.font=this.fontSize*3+'px '+this.fontFamily;
            context.fillText('GAME OVER', this.game.width*0.5, this.game.height*0.5+this.fontSize)
;
        }
        
    }
}