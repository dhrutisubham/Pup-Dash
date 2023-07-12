import { Dust, Fire } from "./particles.js";

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
    constructor(state, game){
        this.state=state;
        this.game=game;

    }
}

export class Sitting extends State{
    constructor(game){
        super('SITTING', game);
    }
    enter(){
        // this.player.game.speed=0;
        this.game.player.frameX=0;
        console.log(this.frameX);
        this.game.player.frameY=5;
        this.game.player.maxFrame=5;

    }
    handleInput(input){
        if(input.includes('ArrowLeft') 
        || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 1);
        }
        else if(input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Running extends State{
    constructor(game){
        super('RUNNING', game);

    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.frameY=3;
        this.game.player.maxFrame=9;

    }
    handleInput(input){
        this.game.particles.unshift(new Dust(this.game, this.game.player.x, this.game.player.y));
        if(input.includes('ArrowDown')){
            this.game.player.setState(states.SITTING, 0);
        }
        else if(input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 1);
        }
        else if(input.includes('Enter') ){
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Jumping extends State{
    constructor(game){
        super('JUMPING', game);
        
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.frameY=1;
        this.game.player.maxFrame=7;
        if(this.game.player.onGround()) this.game.player.vSpeed=-25;

    }
    handleInput(input){
        if(input.includes('Enter')){
            this.game.player.setState(states.ROLLING, 2);
        }
        else if(this.game.player.vSpeed<=0){
            this.game.player.setState(states.FALLING, 1);
        }
    }
}

export class Falling extends State{
    constructor(game){
        super('FALLING', game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.frameY=2;
        this.game.player.maxFrame=7;

    }
    handleInput(input){
        if(this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        }
        // else if(input.includes('Enter')){
        //     this.player.setState(states.ROLLING, 2);
        // }
    }
}

export class Rolling extends State{
    constructor(game){
        super('ROLLING', game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.frameY=6;
        this.game.player.maxFrame=7;

    }
    handleInput(input){
        this.game.particles.unshift(new Fire(this.game, this.game.player.x, this.game.player.y));

        if(input.includes('ArrowUp') && input.includes('Enter') && this.game.player.onGround()){
            this.game.player.vSpeed=-25;
        }
        else if(input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.ROLLING, 2);
        }
        else if(!input.includes('Enter') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        }
        else if(!input.includes('Enter')){
            this.game.player.setState(states.RUNNING, 1);
        }
        
    }
}