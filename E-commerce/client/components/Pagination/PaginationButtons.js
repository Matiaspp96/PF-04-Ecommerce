import { Button, Flex } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PaginationButtons = ({
  handleClick,
  prevClick,
  nextClick,
  currentPage,
  pages,
}) => {
  const buttons = [];
  for (let i = 1; i <= pages; i++) {
    buttons.push(i);
  }

  function addClass(el) {
    if (currentPage < 11 && el < 11) {
      return "block";
    } else if (currentPage > 10 && el > 10) {
      return "block";
    } else return "none";
  }

  return (
    <Flex justifyContent={"center"} flexDir="row" flexWrap="wrap" align-items= 'center'>
      <Button
        me={"1em"}
        onClick={prevClick}
        
        leftIcon={<FaChevronLeft />}
        colorScheme="blue"
        variant="solid"
        size="sm"
        isDisabled={currentPage === 1 ? true : false}
      ></Button>

      {buttons.map((btn, id) => (
        <Button
        colorScheme="blue"
        variant='outline'
          key={id}
          me={"1em"}
          size="sm"
          onClick={handleClick}
          display={addClass(btn)}
          _active={{bgColor:'#1884BE'}}
        >
          {btn}
        </Button>
      ))}

      <Button
        onClick={nextClick}
        rightIcon={<FaChevronRight />}
        colorScheme="blue"
        variant={"solid"}
        size="sm"
        isDisabled={currentPage === pages ? true : false}
      ></Button>
    </Flex>
  );
};

export default PaginationButtons;
