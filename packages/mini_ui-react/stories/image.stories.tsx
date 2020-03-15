import React, { FC } from 'react';
import Image from '../src/Image';

const imgUrl =
  '//images.ctfassets.net/7bfyx8yi9qet/2gjIaMWDqt8m38Xu5y5B1J/d7f77595bf1f2ebaaa024b0399b1a7d5/dog.jpg';

export default {
  component: Image,
  title: 'Image',
};

export const WithDog: FC = () => (
  <Image baseUrl={imgUrl} details={{ image: { width: 500, height: 300 } }} />
);
