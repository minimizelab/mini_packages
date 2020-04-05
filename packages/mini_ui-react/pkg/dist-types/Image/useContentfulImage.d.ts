import { ImageSize, Format, SrcSet } from './types';
interface UseContentfulImageProps {
    baseUrl: string;
    size: ImageSize;
    formats?: Array<Format>;
}
declare type UseContentfulImage = (config: UseContentfulImageProps) => {
    src: string;
    lowResSrc: string;
    srcSets: Array<SrcSet>;
    size: ImageSize;
};
declare const useContentfulImage: UseContentfulImage;
export default useContentfulImage;
