import { IoCloseSharp, IoMenuSharp } from "react-icons/io5";
import { Box } from '@chakra-ui/react'
import React from 'react'

const MenuToggle = ({ toggle, isOpen }) => {
  return (
      <Box display={{ base: "block", md: "none" }} onClick={toggle}>
        {isOpen ? <IoCloseSharp size="1.2em"  /> : <IoMenuSharp size="1.2em" />}
      </Box>
  )
}

export default MenuToggle