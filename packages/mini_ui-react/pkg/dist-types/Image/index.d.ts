import { FC, HTMLAttributes, CSSProperties } from 'react';
import { ImageProps, ImageDetails } from './types';
interface Props extends ImageProps, HTMLAttributes<HTMLImageElement> {
    details: ImageDetails;
    style?: CSSProperties;
    imgStyle?: CSSProperties;
    alt?: string;
    className?: string;
    imgClassName?: string;
}
declare const Image: FC<Props>;
export default Image;
export { ImageDetails } from './types';
