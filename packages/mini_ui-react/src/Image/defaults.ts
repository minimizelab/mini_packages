import { Format } from './types';

const formats: Format[] = [
  {
    type: 'image/webp',
    name: 'webp',
  },
  {
    type: 'image/png',
    name: 'png',
  },
  {
    type: 'image/jpeg',
    name: 'jpg',
  },
];

const defaults = {
  formats,
};

export default defaults;
