const states={
    SITTING: 0, 
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT:6,
}

class State{
    constructor(state){
        this.state=state;

    }
}

export class Sitting extends State{
    constructor(player){
        super('SITTING');
        this.player=player;
    }
    enter(){
        // this.player.game.speed=0;
        this.frameX=0;
        this.player.frameY=5;
        this.player.maxFrame=5;

    }
    handleInput(input){
        if(input.includes('ArrowLeft') 
        || input.includes('ArrowRight')){
            this.player.setState(states.RUNNING, 1);
        }
        else if(input.includes('Enter') && this.player.onGround()){
            this.player.setState(states.ROLLING, 2);
        }
    }
}

export class Running extends State{
    constructor(player){
        super('RUNNING');
        this.player=player;
    }
    enter(){
        this.frameX=0;
        this.player.frameY=3;
        this.player.maxFrame=9;

    }
    handleInput(input){
        if(input.includes('ArrowDown')){
            this.player.setState(states.SITTING, 0);
        }
        else if(input.includes('ArrowUp')){
            this.player.setState(states.JUMPING, 1);
        }
        else if(input.includes('Enter') ){
            this.player.setState(states.ROLLING, 2);
        }
    }
}

export class Jumping extends State{
    constructor(player){
        super('JUMPING');
        this.player=player;
    }
    enter(){
        this.frameX=0;
        this.player.frameY=1;
        this.player.maxFrame=7;
        if(this.player.onGround()) this.player.vSpeed=-25;

    }
    handleInput(input){
        if(input.includes('Enter')){
            this.player.setState(states.ROLLING, 2);
        }
        else if(this.player.vSpeed<=0){
            this.player.setState(states.FALLING, 1);
        }
    }
}

export class Falling extends State{
    constructor(player){
        super('FALLING');
        this.player=player;
    }
    enter(){
        this.frameX=0;
        this.player.frameY=2;
        this.player.maxFrame=7;

    }
    handleInput(input){
        if(this.player.onGround()){
            this.player.setState(states.RUNNING, 1);
        }
        // else if(input.includes('Enter')){
        //     this.player.setState(states.ROLLING, 2);
        // }
    }
}

export class Rolling extends State{
    constructor(player){
        super('ROLLING');
        this.player=player;
    }
    enter(){
        this.frameX=0;
        this.player.frameY=6;
        this.player.maxFrame=7;

    }
    handleInput(input){
        if(input.includes('ArrowUp') && input.includes('Enter') && this.player.onGround()){
            this.player.vSpeed=-25;
        }
        else if(input.includes('Enter') && this.player.onGround()){
            this.player.setState(states.ROLLING, 2);
        }
        else if(!input.includes('Enter') && !this.player.onGround()){
            this.player.setState(states.FALLING, 1);
        }
        
    }
}