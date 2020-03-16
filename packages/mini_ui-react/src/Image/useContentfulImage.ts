import { useMemo } from 'react';
import { urlBuilder } from '@minimizelab/mini_utils';
import { ImageSize, Format, SrcSet } from './types';
import defaults from './defaults';

interface UseContentfulImageProps {
  baseUrl: string;
  size: ImageSize;
  formats?: Format[];
}

type UseContentfulImage = (
  config: UseContentfulImageProps
) => { src: string; lowResSrc: string; srcSets: SrcSet[]; size: ImageSize };

const useContentfulImage: UseContentfulImage = ({
  baseUrl,
  size,
  formats = defaults.formats,
}) => {
  const src = useMemo<string>(
    () =>
      urlBuilder.getContentfulUrl({
        baseUrl,
        format: 'original',
        size,
      }),
    [baseUrl, size]
  );
  const lowResSrc = useMemo<string>(
    () =>
      urlBuilder.getContentfulUrl({
        baseUrl,
        size: { width: 30 },
        format: 'jpg',
        quality: 50,
      }),
    [baseUrl]
  );
  const srcSets = useMemo<SrcSet[]>(
    () =>
      formats.map(({ type, name }) => ({
        srcSet: `${urlBuilder.getContentfulUrl({
          baseUrl,
          format: name,
        })}, 
    ${urlBuilder.getContentfulUrl({
      baseUrl,
      format: name,
      resolution: 1.5,
    })} 1.5x, 
    ${urlBuilder.getContentfulUrl({
      baseUrl,
      format: name,
      resolution: 2,
    })} 2x`,
        type,
      })),
    [formats, baseUrl]
  );
  return { src, srcSets, lowResSrc, size };
};

export default useContentfulImage;
