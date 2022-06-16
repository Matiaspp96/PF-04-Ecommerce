import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      borderRadius='50%'
      onClick={toggleColorMode}
      bgColor='whiteAlpha.900'
      color='blackAlpha.900'
      _hover={{bgColor:'whiteAlpha.800'}}
      icon={colorMode === "light" ? <FaMoon /> : <BsSunFill color='blackAlpha.100' size='1.5rem'/>}
    />
  );
};

export default ColorModeSwitch;
