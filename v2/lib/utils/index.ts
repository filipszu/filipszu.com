import _ from "lodash";
import Post from "../models/Post";

/**
 * Function that will return a `string` stripped of HTML tags.  
 * Accepts a `string` as it's argument.  
 * Throws exception if type of argument is other than `string`.
 * @param inputString Input string ment to be stripped of it's HTML tags.
 * @returns Output string stripped of HTML tags.
 */
export function stripHTMLFromString(inputString: string){
    if(_.isString(inputString)){
        return inputString.replace(/(<([^>]+)>)/gi, "");
    }else{
        throw `stripHTMLFromString() expects a string as an argument. Recieved an object of type: ${typeof inputString}`;
    }
};

export function parsedFileToPost(parsedFile: IParsedFile){
    const parsedFileProps = ['body', 'attributes'];
    const parsedFilesAttributesProps = ['title', 'category', 'date', 'tags']
    if(parsedFileProps.every(parsedFileProp => (parsedFileProp in parsedFile && parsedFilesAttributesProps.every(parsedFileAttributProp => (parsedFileAttributProp in parsedFile.attributes))))){
        const title = parsedFile.attributes.title;
        const body = parsedFile.body;
        const tags = (parsedFile.attributes.tags && _.isArray(parsedFile.attributes.tags)) ? parsedFile.attributes.tags : [];
        const category  = parsedFile.attributes.category;
        const date = parsedFile.attributes.date ? parseStringToDate(parsedFile.attributes.date) : new Date();
        const post = new Post({
            title: title,
            body: body,
            tags: tags,
            category: category,
            date: date
        });
        return post;
    }else{
        const missingProps = parsedFileProps
            .filter(parsedFileProp => (parsedFileProp in parsedFile === false))
            .join(" ");
        throw `parsedFileToPost expects an object implementing IParsedFile. Object passed is missing prop(s): ${missingProps}`;
    }
}

export function parseStringToDate(inputString: string) {
    if(_.isString(inputString)){
        return new Date(Date.parse(inputString));
    }else{
        throw `parseStringToDate expects a string as an argument. Recieved an object of type: ${typeof inputString}`;;
    }
}

export function dateToDateString(date?: Date){
    date = date || new Date();
    return date.toISOString().split('T')[0];
}