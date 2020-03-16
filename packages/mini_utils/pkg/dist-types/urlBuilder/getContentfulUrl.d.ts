import { ImageSize, Fit, Format } from './types';
export interface GetContentfulUrlProps {
    baseUrl: string;
    size?: ImageSize;
    fit?: Fit;
    format: Format;
    quality?: number;
    resolution?: number;
}
export declare type GetContentfulUrl = (config: GetContentfulUrlProps) => string;
declare const getContentfulUrl: GetContentfulUrl;
export default getContentfulUrl;
