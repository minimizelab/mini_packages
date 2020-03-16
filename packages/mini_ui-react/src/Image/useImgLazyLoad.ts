import { useState, useEffect, useCallback } from 'react';

type UseImgLazyLoad = (
  url?: string
) => { loaded: boolean; preloaded: boolean; onLoaded: () => void };

const useImgLazyLoad: UseImgLazyLoad = url => {
  const lazyLoad = url !== undefined;
  const [loaded, setLoaded] = useState(!lazyLoad);
  const [preloaded, setPreloaded] = useState(!lazyLoad);
  const onLoaded = useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);
  useEffect(() => {
    if (!lazyLoad) return;
    const lowImg = new Image();
    lowImg.src = url;
    lowImg.onload = (): void => {
      setPreloaded(true);
    };
  }, [url, setPreloaded, lazyLoad]);
  return { loaded, preloaded, onLoaded };
};

export default useImgLazyLoad;
