import { Container } from "pixi.js";
import { GObject } from "./GObject";
declare module "pixi.js"{
    interface Container{
        $owner?:GObject;
    };
    interface Text{
        $owner?:GObject;
    };
}