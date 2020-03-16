import React, { FC } from 'react';
import Image, { useContentfulImage, useSanityImage } from '../src/Image';

const imgUrl =
  '//images.ctfassets.net/7bfyx8yi9qet/2gjIaMWDqt8m38Xu5y5B1J/d7f77595bf1f2ebaaa024b0399b1a7d5/dog.jpg';

const imageSize = {
  width: 300,
  height: 300,
};

export default {
  component: Image,
  title: 'Image',
};

export const WithContentful: FC = () => {
  const imageProps = useContentfulImage({
    baseUrl: imgUrl,
    size: imageSize,
  });
  return <Image {...imageProps} aspectRatio={1} />;
};

export const WithSanity: FC = () => {
  const imageProps = useSanityImage({
    baseUrl: imgUrl,
    size: imageSize,
  });
  return <Image {...imageProps} aspectRatio={1} />;
};

export const OnlySrc: FC = () => (
  <Image
    src="https://livewallpaper.info/wp-content/uploads/2016/08/cute-dog-wallpaper8.jpg"
    size={imageSize}
    aspectRatio={1}
  />
);
