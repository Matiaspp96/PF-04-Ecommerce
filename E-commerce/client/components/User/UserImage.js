import React from 'react';
import { Image } from '@chakra-ui/react';
const UserImage = ({ avatar, name }) => (
  <Image
    src={avatar || `https://bit.ly/broken-link`}
    alt={name}
    boxSize="200px"
    borderRadius="full"
    mx="auto"
  />
);

export default UserImage;