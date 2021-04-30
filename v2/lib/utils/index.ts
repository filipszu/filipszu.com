import _ from "lodash";
import ISerializablePost from "../models/ISerializablePost";
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

/**
 * A function that given an Object implementing ISerializablePost will retrun a Post Object.
 * @param parsedFile An Object implementing ISerializablePost.
 * @returns A Post Object.
 */
export function seriaziablePostToPost(parsedFile: ISerializablePost){
    const parsedFileProps = ['body', 'attributes'];
    const parsedFilesAttributesProps = ['title', 'category', 'date', 'tags', "previewLength"];
    if(parsedFileProps.every(parsedFileProp => (parsedFileProp in parsedFile && parsedFilesAttributesProps.every(parsedFileAttributProp => (parsedFileAttributProp in parsedFile.attributes))))){
        const title = parsedFile.attributes.title;
        const body = parsedFile.body;
        const tags = (parsedFile.attributes.tags && _.isArray(parsedFile.attributes.tags)) ? parsedFile.attributes.tags : [];
        const category  = parsedFile.attributes.category;
        const date = parsedFile.attributes.date ? parseStringToDate(parsedFile.attributes.date) : new Date();
        const previewLength = _.isNumber(parsedFile.attributes.previewLength) ? parsedFile.attributes.previewLength : -1;
        const post = new Post({
            title: title,
            body: body,
            tags: tags,
            category: category,
            date: date,
            slug: parsedFile.slug,
            link: "/blog/" + parsedFile.slug,
            previewLength: previewLength
        });
        return post;
    }else{
        throw `seriaziablePostToPost expects an object implementing ISerializablePost. Got ${Object.keys(parsedFile).join(" ")}`;
    }
}
/**
 * A function that given a string retrurns a Date Object.
 * @param inputString String that represents a date.
 * @returns Date Object
 */
export function parseStringToDate(inputString: string) {
    if(_.isString(inputString)){
        return new Date(Date.parse(inputString));
    }else{
        throw `parseStringToDate expects a string as an argument. Recieved an object of type: ${typeof inputString}`;
    }
}

/**
 * A function that given a Date Object will return a String in format `YYYY-MM-DD`
 * @param date Date Object 
 * @returns String in format: `YYYY-MM-DD`
 */
export function dateToDateString(date?: Date){
    date = date || new Date();
    return date.toISOString().split('T')[0];
}

export function getPreview(postBody: string, previewLength?: number, ){
    if(_.isString(postBody)){
        let result = postBody.trim().replace(/\n.*/g, '');

        if(_.isNumber(previewLength) && previewLength > 0){
            result = postBody.trim().substr(0, previewLength);
        }

        return result;
    }else{
        throw `getPreview expects a string as an argument. Recieved an object of type: ${typeof postBody}`;
    }
}