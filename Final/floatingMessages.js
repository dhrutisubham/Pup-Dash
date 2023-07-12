export class FloatingMessages{
    constructor(value, x, y, targetX, targetY){
        this.value=value;
        this.x=x;
        this.y=y;
        this.targetX=targetX;
        this.targetY=targetY;
        this.markedForDeletion=false;
        this.timer=0;
        this.fontSize=50;
    }
    update(){
        this.x+=(this.targetX-this.x)*0.03;
        this.y+=(this.targetY-this.y)*0.03;
        this.fontSize-=0.5;
        this.timer++;
        if(this.timer>10000) this.markedForDeletion=true;
    }
    draw(context){
        context.font=this.fontSize+'px Staatliches';
        context.fillStyle='black';
        context.fillText(this.value, this.x, this.y);
        context.fillStyle='white';
        context.fillText(this.value, this.x, this.y+2);

    }
}