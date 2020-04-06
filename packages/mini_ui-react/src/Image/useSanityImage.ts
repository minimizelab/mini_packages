import { useMemo } from 'react';
import { urlBuilder } from '@minimizelab/mini_utils';
import { ImageSize, Format, SrcSet } from './types';
import defaults from './defaults';

interface UseSanityImageProps {
  baseUrl: string;
  size: ImageSize;
  blurUp?: boolean;
  fluid?: boolean;
  quality?: number;
  formats?: Array<Format>;
  sizes?: string;
  resolutions?: Array<number>;
  widths?: Array<number>;
  width?: number;
}

type UseSanityImage = (
  config: UseSanityImageProps
) => {
  src: string;
  lowResSrc?: string;
  srcSets: Array<SrcSet>;
  size: ImageSize;
};

const useSanityImage: UseSanityImage = ({
  baseUrl,
  size,
  blurUp,
  quality,
  fluid = false,
  sizes,
  ...rest
}) => {
  const { formats, width, widths, resolutions } = { ...rest, ...defaults };
  const urlConfig = useMemo(
    () => ({
      baseUrl,
      size,
      quality,
    }),
    [size, baseUrl, quality]
  );
  const src = useMemo<string>(
    () =>
      urlBuilder.getSanityUrl({
        baseUrl,
        format: 'original',
        size,
      }),
    [baseUrl, size]
  );
  const lowResSrc = useMemo<string | undefined>(
    () =>
      blurUp
        ? urlBuilder.getSanityUrl({
            baseUrl,
            size: { width: 30 },
            format: 'original',
            quality: 50,
          })
        : undefined,
    [baseUrl]
  );
  const srcSets = useMemo<Array<SrcSet>>(
    () =>
      formats.map(({ type, name }) => {
        let srcSet = '';
        const options = { type, sizes };
        if (fluid) {
          widths.forEach((w, i) => {
            srcSet = `${i > 0 ? `${srcSet}, ` : ''}${urlBuilder.getSanityUrl({
              ...urlConfig,
              format: name,
              resolution: w,
            })} ${w * (size.width !== undefined ? size.width : width)}w`;
            if (!options.sizes) {
              options.sizes = `(max-width: ${
                size.width !== undefined ? size.width : width
              }px) 100vw, ${size.width !== undefined ? size.width : width}px`;
            }
          });
        } else {
          resolutions.forEach((r, i) => {
            srcSet = `${i > 0 ? `${srcSet},` : ''}${urlBuilder.getSanityUrl({
              ...urlConfig,
              format: name,
              resolution: r,
            })} ${r}x`;
          });
        }
        return {
          srcSet,
          ...options,
        };
      }),
    [formats, baseUrl]
  );
  return { src, srcSets, lowResSrc, size };
};

export default useSanityImage;
