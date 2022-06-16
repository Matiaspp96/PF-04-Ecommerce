import React from 'react';
import { Image } from '@chakra-ui/react';
const UserImage = ({ avatar, name }) => (
  <Image
    src={avatar }
    alt={name}
    boxSize="200px"
    borderRadius="full"
    mx="auto"
  />
);

export default UserImage;