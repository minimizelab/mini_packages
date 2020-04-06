import { ImageSize, QueryStringProps } from './types';
export declare const addSize: (url: string, size: ImageSize, resolution?: number) => string;
export declare const addQueryString: (url: string, queryString: string, preString?: string | undefined) => string;
export declare const addFit: (url: string, fit: string) => string;
export declare const addQuality: (url: string, quality: number) => string;
export declare const addFormat: (url: string, format: string) => string;
export declare const getQueryString: ({ size, resolution, quality, fit, format, }: QueryStringProps) => string;
