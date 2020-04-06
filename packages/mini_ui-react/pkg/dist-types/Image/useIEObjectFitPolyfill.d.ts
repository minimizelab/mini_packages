import { CSSProperties, RefObject } from 'react';
declare type UseIEObjectFitPolyfill = (style: CSSProperties) => {
    imgRef: RefObject<HTMLImageElement>;
    polyfillStyle: CSSProperties;
};
declare const useIEObjectFitPolyfill: UseIEObjectFitPolyfill;
export default useIEObjectFitPolyfill;
