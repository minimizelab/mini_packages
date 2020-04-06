import { addQueryString, getQueryString } from './shared';
import { QueryStringProps } from './types';

export interface GetSanityUrlProps extends QueryStringProps {
  baseUrl: string;
}

export type GetSanityUrl = (config: GetSanityUrlProps) => string;

const getSanityUrl: GetSanityUrl = ({ baseUrl, ...props }) => {
  return addQueryString(baseUrl, getQueryString(props));
};

export default getSanityUrl;
