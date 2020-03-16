// @flow
import React from 'react';
import { urlBuilder } from '@minimizelab/mini_utils';
const Source = ({ format, ...rest }) => (React.createElement("source", { srcSet: `${urlBuilder.getContentfulUrl({ format: format.name, ...rest })}, 
    ${urlBuilder.getContentfulUrl({
        format: format.name,
        resolution: 1.5,
        ...rest,
    })} 1.5x, 
    ${urlBuilder.getContentfulUrl({
        format: format.name,
        resolution: 2,
        ...rest,
    })} 2x`, type: format.type }));
export default Source;
