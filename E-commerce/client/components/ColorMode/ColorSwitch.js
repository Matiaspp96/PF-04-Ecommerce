import { IconButton, useColorMode } from '@chakra-ui/react';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';

const ColorModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<IconButton
			aria-label='Toggle color mode'
			borderRadius='50%'
			onClick={toggleColorMode}
			bgColor={colorMode === 'light' ? '#1a202c' : 'whiteAlpha.900'}
			color={colorMode === 'light' ? 'gray.500' : 'yellow.500'}
			icon={
				colorMode === 'light' ? (
					<FaMoon />
				) : (
					<BsSunFill size='1.5rem' />
				)
			}
		/>
	);
};

export default ColorModeSwitch;
