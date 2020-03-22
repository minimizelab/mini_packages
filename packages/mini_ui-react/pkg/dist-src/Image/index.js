import React from 'react';
import useImgLazyLoad from './useImgLazyLoad';
const Image = ({ size, srcSets, style, imgStyle, aspectRatio, className, imgClassName, lowResSrc, ...props }) => {
    const { loaded, preloaded, onLoaded } = useImgLazyLoad(lowResSrc);
    return (React.createElement("div", { style: {
            width: size.height * aspectRatio,
            height: size.height,
            maxHeight: '100%',
            maxWidth: '100%',
            lineHeight: 0,
            filter: loaded ? 'blur(0px)' : 'blur(10px)',
            transition: 'filter 200ms ease',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: lowResSrc !== undefined ? `url(${lowResSrc})` : undefined,
            ...style,
        }, className: className }, preloaded && (React.createElement("picture", { style: { lineHeight: 0 } },
        srcSets &&
            srcSets.map(srcSet => React.createElement("source", Object.assign({ key: srcSet.type }, srcSet))),
        React.createElement("img", Object.assign({ className: imgClassName, style: {
                width: '100%',
                height: '100%',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 200ms ease',
                objectFit: 'cover',
                objectPosition: 'center',
                boxSizing: 'border-box',
                ...imgStyle,
            }, loading: "lazy", onLoad: onLoaded }, props))))));
};
export default Image;
export { useImgLazyLoad, Image };
export { default as useContentfulImage } from './useContentfulImage';
export { default as useSanityImage } from './useSanityImage';
