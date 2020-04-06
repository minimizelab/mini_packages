import { addQueryString, getQueryString } from './shared';
import { QueryStringProps } from './types';

export interface GetContentfulUrlProps extends QueryStringProps {
  baseUrl: string;
}

export type GetContentfulUrl = (config: GetContentfulUrlProps) => string;

const getContentfulUrl: GetContentfulUrl = ({ baseUrl, ...props }) => {
  return addQueryString(baseUrl, getQueryString(props), 'https:');
};

export default getContentfulUrl;
