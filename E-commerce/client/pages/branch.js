import Navbar from '../components/Navbar/Navbar';
import { Stack } from '@chakra-ui/react';
import Map from '../components/Maps/Map';
import Footer from '../components/Footer/Footer';

export default function Favorites() {
	return (
		<Stack alignItems='center'>
			<Navbar />
			<Map />
			<Footer />
		</Stack>
	);
}
