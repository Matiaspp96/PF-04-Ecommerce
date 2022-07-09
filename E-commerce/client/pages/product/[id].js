import Navbar from '../../components/Navbar/Navbar';
import Detail from '../../components/Detail/Detail';
import Footer from '../../components/Footer/Footer';
import { Stack } from '@chakra-ui/react';

export default function DetailPage() {
	return (
		<Stack alignItems='center'>
			<Navbar />
			<Detail />
			<Footer />
		</Stack>
	);
}
