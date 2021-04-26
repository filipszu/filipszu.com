import fs from "fs";
import path from "path";
import _ from "lodash"
import jsonFm from "json-front-matter";
import { parse } from "node:path";

/**
 * An async function that given a dircetory path will attempt to recursively traverse the folder and return an Array of file paths.
 * @param dir Directory to be read.
 * @returns An Array of file pathnames from the folder including sublfolders.
 */
export async function getFilePaths(dir: string, query?:string[]) {
    const fileNames = await fs.promises.readdir(dir);
    const getFilePathRecursive: (s:string) => Promise<string[]> = async (fileName: string) => {
        const filePath = path.join(dir, fileName);
        const stats = await fs.promises.stat(filePath);
        return stats.isDirectory() ? await getFilePaths(filePath) : [filePath];
    };
    fileNames.map(getFilePathRecursive);
    const allFilenames = fileNames.map(getFilePathRecursive);
    const nestedFileNames = await Promise.all(allFilenames);
    let result = nestedFileNames.reduce((acc, item) => {
        return acc.concat(item);
    }, []) as string[];

    if(_.isArray(query)){
        if(query.length === 1){
            result = result.filter(fileName => {
                return fileName.search(query[0]) !== -1;
            });
        }else{
            result = [];    
        }
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
        if(query.length === 1){
            fileNames = filePaths.filter(fileName => {
                return fileName.search(query[0]) !== -1;
            });
        }else{
            fileNames = [];    
        }
    } 

    fileNames = fileNames.map(filePath => {
        return includeExtensions ? path.basename(filePath) : path.basename(filePath).replace(/\.[^/.]+$/, "");
    });

    return fileNames;
};

export interface IParsedFile{
    body: string,
    attributes: {
        title?: string,
        tags?: string[],
        category: string,
        date: string,
    },
}

export async function getPosts(fileNames: string[]) {
    let result = [];
    if(fileNames.length){
        const file = await fs.promises.readFile(fileNames[0]);
        const parsedFile = jsonFm.parse(file.toString()) as IParsedFile;
        const title = parsedFile.attributes.title ? parsedFile.attributes.title : fileNames[0];
        result.push(parsedFile);
    }
    return result;
}