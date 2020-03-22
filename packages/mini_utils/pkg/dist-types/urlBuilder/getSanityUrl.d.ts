import { Format, ImageSize, SanityFit } from './types';
export interface GetSanityUrlProps {
    baseUrl: string;
    size?: ImageSize;
    fit?: SanityFit;
    format: Format;
    quality?: number;
    resolution?: number;
}
export declare type GetSanityUrl = (config: GetSanityUrlProps) => string;
declare const getSanityUrl: GetSanityUrl;
export default getSanityUrl;
