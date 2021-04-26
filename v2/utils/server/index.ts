import fs from "fs";
import path from "path";

/**
 * An async function that given a dircetory path will attempt to recursively traverse the folder and return an Array of file paths.
 * @param dir Directory to be read.
 * @returns An Array of file pathnames from the folder including sublfolders.
 */
export async function getFilePaths(dir: string) {
    const fileNames = await fs.promises.readdir(dir);
    const getFilePathRecursive: (s:string) => Promise<string[]> = async (fileName: string) => {
        const filePath = path.join(dir, fileName);
        const stats = await fs.promises.stat(filePath);
        return stats.isDirectory() ? await getFilePaths(filePath) : [filePath];
    };
    fileNames.map(getFilePathRecursive);
    const allFilenames = fileNames.map(getFilePathRecursive);
    const nestedFileNames = await Promise.all(allFilenames);
    return nestedFileNames.reduce((acc, item) => {
        return acc.concat(item);
    }, []) as string[];
}