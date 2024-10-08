namespace fgui {

    export const loadBytes = {
        extension: {
            type: PIXI.ExtensionType.LoadParser,
            priority: PIXI.LoaderParserPriority.High,
            name: "loadBytes",
        },

        name: "loadBytes",

        test(url: string): boolean {
            return PIXI.checkExtension(url, '.fui');
        },

        async load(url: string): Promise<ArrayBuffer> {
            const response = await fetch(url);
            return await response.arrayBuffer();
        },

        unload(buff: ArrayBuffer | ArrayBuffer[]): void {
            if (Array.isArray(buff)) {

            } else {

            }
        }
    } satisfies PIXI.LoaderParser<ArrayBuffer>;
}