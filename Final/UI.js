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
    }
}