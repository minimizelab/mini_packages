import { useRef, useEffect, CSSProperties, Ref } from 'react';

type UseIEObjectFitPolyfill = (
  style: CSSProperties
) => {
  imgRef: Ref<HTMLImageElement>;
  polyfillStyle: CSSProperties;
};

const useIEObjectFitPolyfill: UseIEObjectFitPolyfill = ({
  objectFit,
  objectPosition,
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const testImg = document.createElement('img');
    if (
      typeof testImg.style.objectFit === 'undefined' ||
      typeof testImg.style.objectPosition === 'undefined'
    ) {
      import('object-fit-images').then(({ default: ObjectFitImages }) =>
        ObjectFitImages(imgRef.current)
      );
    }
  }, [imgRef]);
  return {
    imgRef,
    polyfillStyle: {
      objectFit,
      objectPosition,
      fontFamily: `"object-fit: ${objectFit}; object-position: ${objectPosition}"`,
    },
  };
};

export default useIEObjectFitPolyfill;
