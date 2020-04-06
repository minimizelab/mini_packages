import { useState, useEffect, useCallback } from 'react';
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
export default useImgLazyLoad;
