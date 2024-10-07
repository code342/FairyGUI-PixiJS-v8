import { Container } from "pixi.js";
declare module "pixi.js"{
    interface Container{
        $owner?:import('./GObject').GObject;
    };
}

