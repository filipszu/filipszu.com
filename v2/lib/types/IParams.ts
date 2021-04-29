import { ParsedUrlQuery } from "node:querystring";

export default interface IParams extends ParsedUrlQuery{
    slug?: string[];
}