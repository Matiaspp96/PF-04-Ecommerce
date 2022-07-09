import Navbar from '../components/Navbar/Navbar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@chakra-ui/react';
import { getItemsCart } from '../redux/actions/cart';
import ProductCart from '../components/Card/ProductsCart';
import Footer from '../components/Footer/Footer';

function Cart() {
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			dispatch(getItemsCart());
		})();
	}, [dispatch]);

	return (
		<Stack alignItems='center'>
			<Navbar />
			<ProductCart />
			<Footer />
		</Stack>
	);
}

export default Cart;
