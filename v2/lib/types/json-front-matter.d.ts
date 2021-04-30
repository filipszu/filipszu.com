declare interface IFrontMatterParsedFile{
    body: string,
    attributes?: {
        date?: string,
        title?: string,
        tags?: string[],
        category?: string,
        previewLength?: number,
    }
}

declare module 'json-front-matter'{
    export function parse(inputString: String): IFrontMatterParsedFile;
};