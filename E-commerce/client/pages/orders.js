import Navbar from '../components/Navbar/Navbar';
import { Stack } from '@chakra-ui/react';
import Footer from '../components/Footer/Footer';
import MenuHistory from '../components/Orderhistory/MenuHistory';

function Orders() {
	//   useEffect(()=>{
	//     (async () => {
	//       dispatch(getItemsCart())
	//     })()
	//   }, [dispatch])

	return (
		<Stack alignItems='center'>
			<Navbar />
			<MenuHistory />
			<Footer />
		</Stack>
	);
}

export default Orders;
