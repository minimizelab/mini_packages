import { FC } from 'react';
import { ImageProps, Format } from './types';
interface Props extends ImageProps {
    format: Format;
}
declare const Source: FC<Props>;
export default Source;
