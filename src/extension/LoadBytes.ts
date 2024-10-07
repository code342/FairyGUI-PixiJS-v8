namespace fgui {

    export const loadBytes = {
        extension: {
            type: ExtensionType.LoadParser,
            priority: LoaderParserPriority.High,
            name: "loadBytes",
        },

        name: "loadBytes",

        test(url: string): boolean {
            return checkExtension(url, '.fui');
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
    } satisfies LoaderParser<ArrayBuffer>;
}