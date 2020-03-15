// @flow

import React, { FC } from 'react';
import { ImageProps, Format } from './types';
import { urlBuilder } from '@minimizelab/mini_utils';

interface Props extends ImageProps {
  format: Format;
}

const Source: FC<Props> = ({ format, ...rest }) => (
  <source
    srcSet={`${urlBuilder.getContentfulUrl({ format: format.name, ...rest })}, 
    ${urlBuilder.getContentfulUrl({
      format: format.name,
      resolution: 1.5,
      ...rest,
    })} 1.5x, 
    ${urlBuilder.getContentfulUrl({
      format: format.name,
      resolution: 2,
      ...rest,
    })} 2x`}
    type={format.type}
  />
);

export default Source;
