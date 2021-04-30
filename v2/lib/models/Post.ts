import * as utils from "../utils";
import {isString, isDate, isArray, isNumber} from "lodash";
import marked from "marked";

export interface IPostDefaultValues{
    title?: string;
    body?: string;
    tags?: string[];
    category?: string; 
    date?: string | Date; 
    slug?: string;
    previewLength?: number;
    link?: string;
}

export default class Post {
    title: string = "";
    tags: string[] = [];
    category: string = "";
    date: Date = new Date();
    dateString: string = "";
    body: string = "";
    slug: string = "";
    preview: string = "";
    previewLength: number = -1;
    link: string = "";

    constructor(defaultValues?: IPostDefaultValues){
        defaultValues = defaultValues || {};
        if(defaultValues.title && isString(defaultValues.title)){
            this.title = defaultValues.title;
        }
        if(defaultValues.tags && isArray(defaultValues.tags)){
            this.tags = defaultValues.tags;
        }
        if(defaultValues.category && isString(defaultValues.category)){
            this.category = defaultValues.category;
        }
        if(defaultValues.date){
            if(isString(defaultValues.date)){
                this.date = utils.parseStringToDate(defaultValues.date);
            }
            if(isDate(defaultValues.date)){
                this.date = defaultValues.date;
            }
            this.dateString = utils.dateToDateString(this.date);
        }
        if(defaultValues.previewLength && isNumber(defaultValues.previewLength)){
            this.previewLength = defaultValues.previewLength;
        }
        if(defaultValues.body && isString(defaultValues.body)){
            this.body = marked(defaultValues.body);
            this.preview = marked(utils.getPreview(defaultValues.body, this.previewLength));
        }
        if(defaultValues.slug && isString(defaultValues.slug)){
            this.slug = defaultValues.slug;
        }
        if(defaultValues.link && isString(defaultValues.link)){
            this.link = defaultValues.link;
        }
    }
}