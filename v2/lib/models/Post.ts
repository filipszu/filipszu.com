import * as utils from "../utils";
import {isString, isDate, isArray} from "lodash";
import marked from "marked";

export default class Post {
    title: string = "";
    tags: string[] = [];
    category: string = "";
    date: Date = new Date();
    body: string = "";
    constructor(defaultValues?: {title?: string, body?: string, tags?: string[], category?: string, date?: string | Date}){
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
        }
        if(defaultValues.body && isString(defaultValues.body)){
            this.body = marked(defaultValues.body);
        }
    }
}