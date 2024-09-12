import {ExtensionType, LoaderParserPriority, checkExtension, LoaderParser} from "pixi.js";

export const loadFui = {
    extension:{
        type: ExtensionType.LoadParser,
        priority: LoaderParserPriority.High,
        name:"loadFui",
    },

    name: "loadFui",

    test(url:string):boolean{
        return checkExtension(url, '.fui');
    },

    async load(url:string):Promise<ArrayBuffer>{
        const response = await fetch(url);
        return await response.arrayBuffer();
    },

    unload(buff:ArrayBuffer|ArrayBuffer[]):void{
        if(Array.isArray(buff)){

        }else{

        }
    }
} satisfies LoaderParser<ArrayBuffer>;