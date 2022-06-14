import React from 'react';
import { Image } from '@chakra-ui/react';
const UserImage = ({ avatar, name }) => (
  <Image
    src={avatar || "https://i.pinimg.com/originals/0b/e7/20/0be720d92134fbdbb80102333ff2b6f5.png"}
    alt={name}
    boxSize="200px"
    borderRadius="full"
    mx="auto"
  />
);

export default UserImage;