import {
	Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image'
import Logo from '../../public/Logo.webp'
import MenuToggle from '../Menu/MenuToggle';
import Search from '../Searchbar/Search';
import NavBarContainer from './NavBarContainer';
import MenuLinks from '../Menu/MenuLinks';
import MenuProfile from '../User/MenuProfile';

const Navbar = props => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	return (
		<Flex
			as='header'
			p='10px'
			h='auto'
			gap='2'
			justifyContent='space-between'
			top='0px'
			pos='sticky'
			w='100%'
			bgColor='#1884BE'
			zIndex='2'
			textColor='whiteAlpha.800'
			boxShadow='2xl'
		>
			<NavBarContainer {...props}>
				<Link href='/'>
					<Image
						className='cursor-pointer'
						src={Logo}
						alt='Logo'
						width='70'
						height='40'
					/>
				</Link>
				<Search />
				<Flex
					display={{ base: 'none', md: 'flex' }}
					flexDir='row-reverse'
					alignItems='center'
					gap='1rem'
				>
					<MenuProfile />
					<MenuLinks isOpen={isOpen} />
				</Flex>
				<Flex
					display={{ base: 'flex', md: 'none' }}
					alignItems='center'
					columnGap='10px'
				>
					<MenuProfile />
					<MenuToggle toggle={toggle} isOpen={isOpen} />
				</Flex>
				<Flex
					display={{ base: isOpen ? 'flex' : 'none', md: 'none' }}
					flexDir='column'
					width='100%'
					alignItems='center'
					rowGap={2}
				>
					<MenuLinks isOpen={isOpen} />
					<Search toggle={toggle} isOpen={isOpen} />
				</Flex>
			</NavBarContainer>
		</Flex>
	);
};

export default Navbar;
