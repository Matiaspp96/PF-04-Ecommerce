import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getOrdersFilterPayment,
  getOrdersFilterPurchase,
} from "../../redux/actions/admin";
import {
  Stack,
  FormLabel,
  Box,
  Checkbox,
  Flex,
  MenuItemOption,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const FilterOrders = ({ setCurrentPage }) => {
  const dispatch = useDispatch();
  // const [categories, setCategories] = useState("");

  const handleFilterByStatusPay = (e) => {
    setCurrentPage(1);
    dispatch(getOrdersFilterPayment(e));
  };

  const handleFilterByStatusPurchase = (e) => {
    setCurrentPage(1);
    dispatch(getOrdersFilterPurchase(e));
  };

  const statusPay = Array.from(
    new Set(
      useSelector((state) => state.adminReducer.totalOrders).map((or) => {
        return or.statusPay;
      })
    )
  );

  const statusPurchase = Array.from(
    new Set(
      useSelector((state) => state.adminReducer.totalOrders).map((or) => {
        return or.statusPurchase;
      })
    )
  );

  return (
    <Flex
      justifyContent={{ base: "center" }}
      h={{ base: "8em", lg: "3em" }}
      gap="1em"
      flexDir={{ base: "column", lg: "row" }}
      mt={{ base: ".5em", md: "1em", lg: "1em" }}
      minW={{ base: "75%", md: "100%", lg: "100%" }}
      maxW="100%"
    >
      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme="blue"
          variant={"solid"}
        >
          Payment Status
        </MenuButton>
        <MenuList minW="140px" maxW="140px">
          <MenuOptionGroup
            justifyContent="center"
            alignContent="center"
            type="radio"
            onChange={handleFilterByStatusPay}
          >
            <MenuItemOption value={"ALL"}>All</MenuItemOption>
            {statusPay.map((el) => {
              return (
                <MenuItemOption key={el} value={el}>
                  {el}
                </MenuItemOption>
              );
            })}
          </MenuOptionGroup>
        </MenuList>
      </Menu>

      <Menu closeOnSelect={false}>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          colorScheme="blue"
          variant={"solid"}
        >
          Purchase Status
        </MenuButton>
        <MenuList minW="140px" maxW="140px">
          <MenuOptionGroup
            justifyContent="center"
            alignContent="center"
            type="radio"
            onChange={handleFilterByStatusPurchase}
          >
            <MenuItemOption value={"ALL"}>All</MenuItemOption>
            {statusPurchase.map((el) => {
              return (
                <MenuItemOption key={el} value={el}>
                  {el}
                </MenuItemOption>
              );
            })}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      {/* <Stack>
      <FormLabel>Payment Status:</FormLabel>
      <Box>
        {statusPay.map((el) => {
          return (
            <Checkbox
              key={el}
              m={".3rem"}
              value={el}
              onChange={(e) => handleFilterByStatus(e)}
            >
              {el}
            </Checkbox>
          );
        })}
      </Box>
    </Stack> */}
      {/* <Stack>
      <FormLabel>Payment Status:</FormLabel>
      <Box>
        {statusPurchase.map((el) => {
          return (
            <Checkbox
              key={el}
              m={".3rem"}
              value={el}
              onChange={(e) => handleFilterByStatus(e)}
            >
              {el}
            </Checkbox>
          );
        })}
      </Box>
    </Stack> */}
    </Flex>
  );
};

export default FilterOrders;
