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

/**
 * Function that given a Next JS router query from a dynamic catch all route and an Array of slugs will return the matching slugs.
 * @param query An `Array` of `strings` representing the query.
 * @param posts An `Array` of `strings` representing the posts.
 * @returns 
 */
export function getMatchingSlugs(query:string[], posts:string[]) {
    let result = [] as string[];
    if(_.isArray(query) && query.length > 0 && posts.indexOf(query[0]) !== -1){
        result.push(posts[posts.indexOf(query[0])]);
    }
    return result;
}