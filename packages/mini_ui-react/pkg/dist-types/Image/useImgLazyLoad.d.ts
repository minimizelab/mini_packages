declare type UseImgLazyLoad = (url?: string) => {
    loaded: boolean;
    preloaded: boolean;
    onLoaded: () => void;
};
declare const useImgLazyLoad: UseImgLazyLoad;
export default useImgLazyLoad;
