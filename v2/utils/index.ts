import _ from "lodash";

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