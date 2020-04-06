import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { urlBuilder } from '@minimizelab/mini_utils';

const useImgLazyLoad = (url) => {
    const lazyLoad = typeof url !== 'undefined';
    const [loaded, setLoaded] = useState(!lazyLoad);
    const [preloaded, setPreloaded] = useState(!lazyLoad);
    const onLoaded = useCallback(() => {
        setLoaded(true);
    }, [setLoaded]);
    useEffect(() => {
        if (typeof url === 'undefined')
            return;
        const lowImg = new Image();
        lowImg.src = url;
        lowImg.onload = () => {
            setPreloaded(true);
        };
    }, [url, setPreloaded, lazyLoad]);
    return { loaded, preloaded, onLoaded };
};

const useIEObjectFitPolyfill = ({ objectFit, objectPosition, }) => {
    const imgRef = useRef(null);
    useEffect(() => {
        const testImg = document.createElement('img');
        if (typeof testImg.style.objectFit === 'undefined' ||
            typeof testImg.style.objectPosition === 'undefined') {
            import('object-fit-images').then(({ default: ObjectFitImages }) => {
                ObjectFitImages(imgRef.current);
            });
        }
    }, [imgRef]);
    return {
        imgRef,
        polyfillStyle: {
            objectFit,
            objectPosition,
            fontFamily: `object-fit: ${objectFit}; object-position: ${objectPosition}`,
        },
    };
};

const formats = [
    {
        type: 'image/webp',
        name: 'webp',
    },
    {
        type: 'image/png',
        name: 'png',
    },
    {
        type: 'image/jpeg',
        name: 'jpg',
    },
];
const defaults = {
    formats,
};

const useContentfulImage = ({ baseUrl, size, formats = defaults.formats, }) => {
    const src = useMemo(() => urlBuilder.getContentfulUrl({
        baseUrl,
        format: 'original',
    }), [baseUrl, size]);
    const lowResSrc = useMemo(() => urlBuilder.getContentfulUrl({
        baseUrl,
        size: { width: 30 },
        format: 'jpg',
        quality: 50,
    }), [baseUrl]);
    const srcSets = useMemo(() => formats.map(({ type, name }) => ({
        srcSet: `${urlBuilder.getContentfulUrl({
            size,
            baseUrl,
            format: name,
        })}, 
    ${urlBuilder.getContentfulUrl({
            size,
            baseUrl,
            format: name,
            resolution: 1.5,
        })} 1.5x, 
    ${urlBuilder.getContentfulUrl({
            size,
            baseUrl,
            format: name,
            resolution: 2,
        })} 2x`,
        type,
    })), [formats, baseUrl]);
    return { src, srcSets, lowResSrc, size };
};

const useSanityImage = ({ baseUrl, size, blurUp, quality, formats = defaults.formats, }) => {
    const urlConfig = useMemo(() => ({
        baseUrl,
        size,
        quality,
    }), [size, baseUrl, quality]);
    const src = useMemo(() => urlBuilder.getSanityUrl({
        baseUrl,
        format: 'original',
        size,
    }), [baseUrl, size]);
    const lowResSrc = useMemo(() => blurUp
        ? urlBuilder.getSanityUrl({
            baseUrl,
            size: { width: 30 },
            format: 'original',
            quality: 50,
        })
        : undefined, [baseUrl]);
    const srcSets = useMemo(() => formats.map(({ type, name }) => ({
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
    })), [formats, baseUrl]);
    return { src, srcSets, lowResSrc, size };
};

const Image$1 = ({ size, srcSets, style, imgStyle, aspectRatio, className, imgClassName, lowResSrc, ...props }) => {
    const { loaded, preloaded, onLoaded } = useImgLazyLoad(lowResSrc);
    const { imgRef, polyfillStyle } = useIEObjectFitPolyfill({
        objectFit: imgStyle && imgStyle.objectFit ? imgStyle.objectFit : 'cover',
        objectPosition: imgStyle && imgStyle.objectPosition ? imgStyle.objectPosition : 'center',
    });
    return (React.createElement("div", { style: {
            width: size.height ? size.height * aspectRatio : undefined,
            height: size.height,
            maxHeight: '100%',
            maxWidth: '100%',
            lineHeight: 0,
            filter: loaded ? 'blur(0px)' : 'blur(10px)',
            transition: 'filter 200ms ease',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: typeof lowResSrc !== 'undefined' ? `url(${lowResSrc})` : undefined,
            ...style,
        }, className: className }, preloaded && (React.createElement("picture", { style: { lineHeight: 0 } },
        srcSets &&
            srcSets.map((srcSet) => React.createElement("source", Object.assign({ key: srcSet.type }, srcSet))),
        React.createElement("img", Object.assign({ ref: imgRef, className: imgClassName, style: {
                width: '100%',
                height: '100%',
                opacity: loaded ? 1 : 0,
                transition: 'opacity 200ms ease',
                objectFit: 'cover',
                objectPosition: 'center',
                boxSizing: 'border-box',
                ...imgStyle,
                ...polyfillStyle,
            }, loading: "lazy", onLoad: onLoaded }, props))))));
};

export { Image$1 as Image, useContentfulImage, useIEObjectFitPolyfill, useImgLazyLoad, useSanityImage };
//# sourceMappingURL=index.js.map
