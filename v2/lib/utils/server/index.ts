import fs from "fs";
import path from "path";
import _ from "lodash"
import jsonFm from "json-front-matter";
import * as utils from "../index";


/**
 * An async function that given a dircetory path will attempt to recursively traverse the folder and return an Array of file paths.
 * @param dir Directory to be read.
 * @returns An Array of file pathnames from the folder including sublfolders.
 */
export async function getFilePaths(dir: string, query?:string[]) {
    const fileNames = await fs.promises.readdir(dir);
    const getFilePathsRecursive: (s:string) => Promise<string[]> = async (fileName: string) => {
        const filePath = path.join(dir, fileName);
        const stats = await fs.promises.stat(filePath);
        return stats.isDirectory() ? await getFilePaths(filePath) : [filePath];
    };
    const nestedFileNames = await Promise.all(fileNames.map(getFilePathsRecursive));
    let result = nestedFileNames.reduce((acc, item) => {
        return acc.concat(item);
    }, []) as string[];

    if(_.isArray(query)){
        result = getStringsMatchingQuery(query, result);
    }    

    return result;
}

/**
 * A function that given an Array of strings and another Array of strings will find the matching ones.
 * @param query An Array of strings of needles
 * @param haystack The haystack to search
 * @returns An Array of string that match the query
 */
export function getStringsMatchingQuery(query: string[], haystack: string[]){
    let result = [] as string[];
    if(query.length === 1){
        result = haystack.filter(str => {
            return str.search(query[0]) !== -1;
        });
    }
    return result;
}

/**
 * An async function that given a dircetory path will attempt to recursively traverse the folder and return an Array of file names without extensions.
 * @param dir Directory to be read
 * @returns An Array of filenames without extensions including sublfolders.
 */
export async function getFileNames(dir: string, includeExtensions = false, query?:string[]) {
    const filePaths = await getFilePaths(dir, query);
    let fileNames = filePaths;

    if(_.isArray(query)){
        fileNames = getStringsMatchingQuery(query, fileNames);
    } 

    fileNames = fileNames.map(filePath => {
        return getFileName(filePath);
    });

    return fileNames;
};

export function getFileName(filePath: string, includeExtensions = false){
    return includeExtensions ? path.basename(filePath) : path.basename(filePath).replace(/\.[^/.]+$/, "");
}

/**
 * An async function that given an Array of filePaths will return an Array of Objects implementing the IParsedFile interface.
 * @param filePaths An Array of strings which should be the filePaths of files to be read and parsed. 
 * @returns An Array of Objects implementing the IParsedFile interface.
 */
export async function getParsedFiles(filePaths: string[]) {
    let result = [] as IParsedFile[];
    if(filePaths.length){
        result = await Promise.all(filePaths.map(async filePath => {
            const parsedFile = await getParsedFile(filePath);
            return parsedFile;
        }));       
    }
    return result;
}

/**
 * An Async function that given a Path to a file will read and parse the file and return an Object implementing IParsedFile.
 * @param filePath Path to the file that is ment to be read and parsed.
 * @returns Object implementing IParsedFile.
 */
export async function getParsedFile(filePath: string){
    const file = await fs.promises.readFile(filePath);
    const parsedFile = jsonFm.parse(file.toString()) as IParsedFile;
    if("body" in parsedFile === false){
        parsedFile.body = "";
    }
    if(parsedFile.attributes){
        if("title" in parsedFile.attributes === false){
            parsedFile.attributes.title = getFileName(filePath);
        }
        if("date" in parsedFile.attributes === false){
            parsedFile.attributes.date = utils.dateToDateString();
        }
        if("category" in parsedFile.attributes === false){
            parsedFile.attributes.category = "";
        }
        if("tags" in parsedFile.attributes === false){
            parsedFile.attributes.tags = [];
        }
    }else{
        parsedFile.attributes = {
            title: getFileName(filePath),
            date: utils.dateToDateString(),
            category: "",
            tags: [],
        };
    }

    parsedFile.slug = getFileName(filePath);
    return parsedFile;
}