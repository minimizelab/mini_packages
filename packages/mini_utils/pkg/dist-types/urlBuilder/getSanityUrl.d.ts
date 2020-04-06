import { QueryStringProps } from './types';
export interface GetSanityUrlProps extends QueryStringProps {
    baseUrl: string;
}
export declare type GetSanityUrl = (config: GetSanityUrlProps) => string;
declare const getSanityUrl: GetSanityUrl;
export default getSanityUrl;
