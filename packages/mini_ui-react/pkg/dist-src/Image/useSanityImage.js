import { useMemo } from 'react';
import { urlBuilder } from '@minimizelab/mini_utils';
import defaults from './defaults';
const useSanityImage = ({ baseUrl, size, formats = defaults.formats, }) => {
    const src = useMemo(() => urlBuilder.getSanityUrl({
        baseUrl,
        format: 'original',
        size,
    }), [baseUrl, size]);
    const lowResSrc = useMemo(() => urlBuilder.getSanityUrl({
        baseUrl,
        size: { width: 30 },
        format: 'jpg',
        quality: 50,
    }), [baseUrl]);
    const srcSets = useMemo(() => formats.map(({ type, name }) => ({
        srcSet: `${urlBuilder.getSanityUrl({
            baseUrl,
            format: name,
        })}, 
    ${urlBuilder.getSanityUrl({
            baseUrl,
            format: name,
            resolution: 1.5,
        })} 1.5x, 
    ${urlBuilder.getSanityUrl({
            baseUrl,
            format: name,
            resolution: 2,
        })} 2x`,
        type,
    })), [formats, baseUrl]);
    return { src, srcSets, lowResSrc, size };
};
export default useSanityImage;