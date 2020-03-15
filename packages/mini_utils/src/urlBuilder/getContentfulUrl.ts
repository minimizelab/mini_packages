import {
  addSize,
  addFit,
  addQuality,
  addFormat,
  addQueryString,
} from './shared';
import { ImageSize, Fit, Format } from './types';

export interface GetContentfulUrlProps {
  baseUrl: string;
  size?: ImageSize;
  fit?: Fit;
  format: Format;
  quality?: number;
  resolution?: number;
}

export type GetContentfulUrl = (config: GetContentfulUrlProps) => string;

const getContentfulUrl: GetContentfulUrl = ({
  baseUrl,
  size,
  fit,
  format,
  quality,
  resolution,
}) => {
  let queryString = '';
  if (size) queryString = addSize(queryString, size, resolution);
  if (fit) queryString = addFit(queryString, fit);
  if (quality !== undefined) queryString = addQuality(queryString, quality);
  queryString = addFormat(queryString, format);

  return addQueryString(baseUrl, queryString);
};

export default getContentfulUrl;
