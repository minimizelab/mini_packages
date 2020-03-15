import React, { useMemo, FC, HTMLAttributes, CSSProperties } from 'react';
import { urlBuilder } from '@minimizelab/mini_utils';
import { ImageProps, ImageSize, ImageDetails } from './types';
import useImgLazyLoad from './useImgLazyLoad';
import defaults from './defaults';
import Source from './Source';

interface Props extends ImageProps, HTMLAttributes<HTMLImageElement> {
  details: ImageDetails;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  alt?: string;
  className?: string;
  imgClassName?: string;
}

const getAspectRatio = (
  details: ImageDetails,
  size?: ImageSize
): { aspectRatio: number; calcSize: { width: number; height: number } } => {
  const original = details.image.width / details.image.height;
  const calcSize = {
    width: size && size.width !== undefined ? size.width : details.image.width,
    height:
      size && size.height !== undefined ? size.height : details.image.height,
  };
  if (size && size.height !== undefined && size.width !== undefined) {
    return { aspectRatio: size.width / size.height, calcSize };
  }
  return { aspectRatio: original, calcSize };
};

const Image: FC<Props> = ({
  baseUrl,
  details,
  size,
  quality,
  fit,
  style,
  imgStyle,
  className,
  imgClassName,
  alt,
  ...props
}) => {
  const { aspectRatio, calcSize } = useMemo(
    () => getAspectRatio(details, size),
    [details, size]
  );
  const lowResUrl = useMemo(
    () =>
      urlBuilder.getContentfulUrl({
        baseUrl,
        size: { width: 30 },
        format: 'jpg',
        quality: 50,
      }),
    [baseUrl]
  );
  const { loaded, preloaded, onLoaded } = useImgLazyLoad(lowResUrl);
  return (
    <div
      style={{
        width: calcSize.width,
        height: calcSize.width / aspectRatio,
        maxHeight: '100%',
        maxWidth: '100%',
        lineHeight: 0,
        filter: loaded ? 'blur(0px)' : 'blur(10px)',
        transition: 'filter 200ms ease',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: !loaded ? `url(${lowResUrl})` : undefined,
        ...style,
      }}
      className={className}
    >
      {preloaded && (
        <picture style={{ lineHeight: 0 }}>
          {defaults.formats.map(format => (
            <Source
              key={format.type}
              baseUrl={baseUrl}
              size={size}
              fit={fit}
              quality={quality}
              format={format}
            />
          ))}
          <img
            className={imgClassName}
            style={{
              width: '100%',
              height: '100%',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 200ms ease',
              objectFit: 'cover',
              objectPosition: 'center',
              boxSizing: 'border-box',
              ...imgStyle,
            }}
            src={urlBuilder.getContentfulUrl({
              baseUrl,
              size,
              fit,
              format: 'original',
              quality,
            })}
            loading="lazy"
            onLoad={onLoaded}
            alt={alt}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default Image;

export { ImageDetails } from './types';
