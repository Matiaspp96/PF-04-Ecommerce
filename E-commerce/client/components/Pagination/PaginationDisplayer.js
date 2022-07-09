import PaginationButtons from './PaginationButtons';
import { Stack } from '@chakra-ui/react';

const PaginationDisplayer = ({
	products,
	elements,
	Component,
	currentPage,
	setCurrentPage,
}) => {
	const pages = Math.ceil(products.length / elements);

	const getPaginatedProducts = () => {
		const idxEnd = currentPage * elements;
		const idxStart = idxEnd - elements;
		return products.slice(idxStart, idxEnd);
	};

	function handleClick(e) {
		const page = parseInt(e.target.innerText);
		setCurrentPage(page);
	}

	function prevClick() {
		const page = currentPage;
		if (page === 1) {
			
		} else {
			setCurrentPage(page - 1);
		}
	}

	function nextClick() {
		const page = currentPage;
		if (page === pages) {
			
		} else {
			setCurrentPage(page + 1);
		}
	}

	return (
		<Stack w={'100%'} py={3}>
			<PaginationButtons
				handleClick={handleClick}
				prevClick={prevClick}
				nextClick={nextClick}
				currentPage={currentPage}
				pages={pages}
			/>

			<Component products={getPaginatedProducts()} />
		</Stack>
	);
};

export default PaginationDisplayer;
