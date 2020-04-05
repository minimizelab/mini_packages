import { CSSProperties, Ref } from 'react';
declare type UseIEObjectFitPolyfill = (style: CSSProperties) => {
    imgRef: Ref<HTMLImageElement>;
    polyfillStyle: CSSProperties;
};
declare const useIEObjectFitPolyfill: UseIEObjectFitPolyfill;
export default useIEObjectFitPolyfill;
