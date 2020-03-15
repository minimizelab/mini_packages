import { ImageSize } from './types';

export const addSize = (
  url: string,
  size: ImageSize,
  resolution = 1
): string => {
  let sizeString = '';
  if (size.width !== undefined) sizeString += `&w=${size.width * resolution}`;
  if (size.height !== undefined) sizeString += `&h=${size.height * resolution}`;
  return url + sizeString;
};

export const addQueryString = (url: string, queryString: string): string =>
  queryString.length > 0
    ? `https:${url}?${
        queryString[0] === '&'
          ? queryString.slice(1, queryString.length)
          : queryString
      }`
    : `https:${url}`;

export const addFit = (url: string, fit: string): string => `${url}&fit=${fit}`;

export const addQuality = (url: string, quality: number): string =>
  `${url}&q=${quality}`;

export const addFormat = (url: string, format: string): string => {
  if (format === 'jpg') {
    return `${url}&fm=jpg&fl=progressive`;
  } else if (format !== 'original') {
    return `${url}&fm=${format}`;
  }
  return url;
};
