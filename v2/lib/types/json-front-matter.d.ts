declare interface IParsedFile{
    body: string,
    attributes: {
        title?: string,
        tags?: string[],
        category?: string,
        date: string,
    },
}

declare module 'json-front-matter'{
    export function parse(inputString: String): IParsedFile;
};