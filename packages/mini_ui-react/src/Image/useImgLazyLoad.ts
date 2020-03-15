import { useState, useEffect, useCallback } from 'react';

type UseImgLazyLoad = (
  url: string
) => { loaded: boolean; preloaded: boolean; onLoaded: () => void };

const useImgLazyLoad: UseImgLazyLoad = url => {
  const [loaded, setLoaded] = useState(false);
  const [preloaded, setPreloaded] = useState(false);
  const onLoaded = useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);
  useEffect(() => {
    const lowImg = new Image();
    lowImg.src = url;
    lowImg.onload = (): void => {
      setPreloaded(true);
    };
  }, [url, setPreloaded]);
  return { loaded, preloaded, onLoaded };
};

export default useImgLazyLoad;
