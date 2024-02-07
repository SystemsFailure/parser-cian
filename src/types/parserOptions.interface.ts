import { ParserCianCity } from "./cianCity.interface";

export interface ParserOptions {
    baseUrl: string;
    timeout: number;
    timeDelay: any;
    cities: ParserCianCity[];
}