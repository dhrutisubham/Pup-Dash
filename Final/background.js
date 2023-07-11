class Layer{
    constructor(game, width, height, speedMod, image){
        this.game=game;
        this.width=width;
        this.height=height;
        this.speedMod=speedMod;
        this.image=image;
        this.x=0;
        this.y=0;
    }
    update(){
        if(this.x< -this.width) this.x=0;
        else this.x-=this.game.speed*this.speedMod;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x+this.width, this.y, this.width, this.height);

    }
}

export class Background{
    constructor(game){
        this.game=game;
        this.width=1667;
        this.height=500;
        this.layer1image=layer1;
        this.layer2image=layer2;
        this.layer3image=layer3;
        this.layer4image=layer4;
        this.layer5image=layer5;

        this.layer1=new Layer(this.game, this.width, this.height, 1, this.layer5image);
        this.bgLayers=[this.layer1];
    }
    update(){
        this.bgLayers.forEach(layer=>{
            layer.update();
        })
    }

    draw(context){
        this.bgLayers.forEach(layer=>{
            layer.draw(context);
        })
    }
}