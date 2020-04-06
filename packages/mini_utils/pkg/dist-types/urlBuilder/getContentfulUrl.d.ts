import { QueryStringProps } from './types';
export interface GetContentfulUrlProps extends QueryStringProps {
    baseUrl: string;
}
export declare type GetContentfulUrl = (config: GetContentfulUrlProps) => string;
declare const getContentfulUrl: GetContentfulUrl;
export default getContentfulUrl;
