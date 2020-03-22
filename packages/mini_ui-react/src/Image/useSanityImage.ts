import { useMemo } from 'react';
import { urlBuilder } from '@minimizelab/mini_utils';
import { ImageSize, Format, SrcSet } from './types';
import defaults from './defaults';

interface UseSanityImageProps {
  baseUrl: string;
  size: ImageSize;
  blurUp?: boolean;
  quality?: number;
  formats?: Format[];
}

type UseSanityImage = (
  config: UseSanityImageProps
) => { src: string; lowResSrc?: string; srcSets: SrcSet[]; size: ImageSize };

const useSanityImage: UseSanityImage = ({
  baseUrl,
  size,
  blurUp,
  quality,
  formats = defaults.formats,
}) => {
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
  const srcSets = useMemo<SrcSet[]>(
    () =>
      formats.map(({ type, name }) => ({
        srcSet: `${urlBuilder.getSanityUrl({
          ...urlConfig,
          format: name,
        })}, 
    ${urlBuilder.getSanityUrl({
      ...urlConfig,
      format: name,
      resolution: 1.5,
    })} 1.5x, 
    ${urlBuilder.getSanityUrl({
      ...urlConfig,
      format: name,
      resolution: 2,
    })} 2x`,
        type,
      })),
    [formats, baseUrl]
  );
  return { src, srcSets, lowResSrc, size };
};

export default useSanityImage;
