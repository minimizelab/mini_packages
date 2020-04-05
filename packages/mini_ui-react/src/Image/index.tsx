import React, { FC, HTMLAttributes, CSSProperties } from 'react';
import { ImageSize, SrcSet } from './types';
import useImgLazyLoad from './useImgLazyLoad';
import useIEObjectFitPolyfill from './useIEObjectFitPolyfill';

interface Props extends HTMLAttributes<HTMLImageElement> {
  size: ImageSize;
  lowResSrc?: string;
  srcSets?: Array<SrcSet>;
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
  const { imgRef, polyfillStyle } = useIEObjectFitPolyfill({
    objectFit: imgStyle?.objectFit ? imgStyle.objectFit : 'cover',
    objectPosition: imgStyle?.objectPosition
      ? imgStyle.objectPosition
      : 'center',
  });
  return (
    <div
      style={{
        width: size.height ? size.height * aspectRatio : undefined,
        height: size.height,
        maxHeight: '100%',
        maxWidth: '100%',
        lineHeight: 0,
        filter: loaded ? 'blur(0px)' : 'blur(10px)',
        transition: 'filter 200ms ease',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage:
          lowResSrc !== undefined ? `url(${lowResSrc})` : undefined,
        ...style,
      }}
      className={className}
    >
      {preloaded && (
        <picture style={{ lineHeight: 0 }}>
          {srcSets &&
            srcSets.map(srcSet => <source key={srcSet.type} {...srcSet} />)}
          <img
            ref={imgRef}
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
              ...polyfillStyle,
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
export { useImgLazyLoad, Image };
export { default as useContentfulImage } from './useContentfulImage';
export { default as useSanityImage } from './useSanityImage';
export { default as useIEObjectFitPolyfill } from './useIEObjectFitPolyfill';
