import React, { FC, HTMLAttributes, CSSProperties } from 'react';
import { ImageSize, SrcSet } from './types';
import useImgLazyLoad from './useImgLazyLoad';

interface Props extends HTMLAttributes<HTMLImageElement> {
  size: ImageSize;
  lowResSrc?: string;
  srcSets?: SrcSet[];
  src: string;
  aspectRatio: number;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  alt?: string;
  className?: string;
  imgClassName?: string;
}

const Image: FC<Props> = ({
  size,
  srcSets,
  style,
  imgStyle,
  aspectRatio,
  className,
  imgClassName,
  lowResSrc,
  ...props
}) => {
  const { loaded, preloaded, onLoaded } = useImgLazyLoad(lowResSrc);
  return (
    <div
      style={{
        width: size.width,
        height: size.width / aspectRatio,
        maxHeight: '100%',
        maxWidth: '100%',
        lineHeight: 0,
        filter: loaded ? 'blur(0px)' : 'blur(10px)',
        transition: 'filter 200ms ease',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: lowResSrc ? `url(${lowResSrc})` : undefined,
        ...style,
      }}
      className={className}
    >
      {preloaded && (
        <picture style={{ lineHeight: 0 }}>
          {srcSets &&
            srcSets.map(srcSet => <source key={srcSet.type} {...srcSet} />)}
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
            loading="lazy"
            onLoad={onLoaded}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};

export default Image;
export { useImgLazyLoad };
export { default as useContentfulImage } from './useContentfulImage';
export { default as useSanityImage } from './useSanityImage';
