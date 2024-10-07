namespace fgui {

    export class AssetProxy {


        private static _inst: AssetProxy;

        public static get inst(): AssetProxy {
            if (!AssetProxy._inst)
                AssetProxy._inst = new AssetProxy();
            return AssetProxy._inst;
        }

        public getRes(url: string, type?: string): any {
            return PIXI.Assets.get(url)
        }

        getItemRes(item: PackageItem) {
            return this.getRes(item.file);
        }

        public load(url: string | string[], type?: string, onProgress?: (progress: number) => void): Promise<any> {
            //return this.loader.load(url, type, onProgress);
            return PIXI.Assets.load(url, onProgress);
        }

        //TODO：待测试是否释放texture
        clearTextureRes(url: string) {
            PIXI.Assets.unload(url);
        }
    }
}