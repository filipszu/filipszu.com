// Extra typings needed globally by the project
import { ParsedUrlQuery } from "node:querystring";
export interface IParams extends ParsedUrlQuery {
    slug: string[]
};