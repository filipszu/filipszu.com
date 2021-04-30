declare interface IFrontMatterParsedFile{
    body: string,
    attributes?: {
        [key: string]: any
    }
}

declare module 'json-front-matter'{
    export function parse(inputString: String): IFrontMatterParsedFile;
};