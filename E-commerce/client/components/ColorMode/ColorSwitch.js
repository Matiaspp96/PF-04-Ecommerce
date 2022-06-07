import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      color={colorMode === "light" ? 'blackAlpha.800' : 'whiteAlpha.800'}
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
    />
  );
};

export default ColorModeSwitch;
