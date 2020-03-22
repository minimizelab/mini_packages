import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { urlBuilder } from '@minimizelab/mini_utils';

const useImgLazyLoad = url => {
    const lazyLoad = url !== undefined;
    const [loaded, setLoaded] = useState(!lazyLoad);
    const [preloaded, setPreloaded] = useState(!lazyLoad);
    const onLoaded = useCallback(() => {
        setLoaded(true);
    }, [setLoaded]);
    useEffect(() => {
        if (!lazyLoad)
            return;
        const lowImg = new Image();
        lowImg.src = url;
        lowImg.onload = () => {
            setPreloaded(true);
        };
    }, [url, setPreloaded, lazyLoad]);
    return { loaded, preloaded, onLoaded };
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

export { Image$1 as Image, useContentfulImage, useImgLazyLoad, useSanityImage };
//# sourceMappingURL=index.js.map
