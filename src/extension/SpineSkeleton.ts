import { Container } from "pixi.js";
import SpineTemplet from "./SpineTemplet";

export default class SpineSkeleton extends Container{
    public templet:SpineTemplet;
    public play(nameOrIndex: any, loop: boolean, force: boolean = true, start: number = 0, end: number = 0, freshSkin: boolean = true, playAudio: boolean = true): void {
    }

    stop(){

    }

    showSkinByName(name:string){

    }

    showSkinByIndex(idx:number){
        
    }
}