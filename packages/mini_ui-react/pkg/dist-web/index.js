import React, { useState, useCallback, useEffect } from 'react';
import '@minimizelab/mini_utils';

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

const Image$1 = ({ size, srcSets, style, imgStyle, aspectRatio, className, imgClassName, lowResSrc, ...props }) => {
    const { loaded, preloaded, onLoaded } = useImgLazyLoad(lowResSrc);
    return (React.createElement("div", { style: {
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

export { Image$1 as Image, useImgLazyLoad };
//# sourceMappingURL=index.js.map
