import { ImageSize, Format, ContentfulFit } from './types';
export interface GetContentfulUrlProps {
    baseUrl: string;
    size?: ImageSize;
    fit?: ContentfulFit;
    format: Format;
    quality?: number;
    resolution?: number;
}
export declare type GetContentfulUrl = (config: GetContentfulUrlProps) => string;
declare const getContentfulUrl: GetContentfulUrl;
export default getContentfulUrl;
