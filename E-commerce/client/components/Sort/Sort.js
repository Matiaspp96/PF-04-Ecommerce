import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderProducts } from "../../redux/actions/products";
import { filterByCategory } from "../../redux/actions/categories";
import { Flex, Text, Select } from "@chakra-ui/react";

const Sort = ({ setCurrentPage, setSort }) => {
  const [categories, setCategories] = useState("");
  const dispatch = useDispatch();

  const handleSort = (e) => {
    dispatch(orderProducts(e.target.value));
    setCurrentPage(1);
    setSort(e.target.value);
  };

  const handleFilterByCategories = (e) => {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
    setCurrentPage(1);
    setCategories(e.target.value);
  };

  return (
    <Flex
      justifyContent={{ base: "center" }}
      h={{ base: "8em", lg: "3em" }}
      gap="1.5em"
      flexDir={{ base: "column", lg: "row" }}
      whiteSpace="nowrap"
    >
      <Flex alignItems={"center"} gap="1.5em">
        <Text fontWeight={"bold"}>Sort by:</Text>
        <Select placeholder="" onChange={handleSort}>
          <option value="MIN">Lower price</option>
          <option value="MAX">Higher price</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </Select>
      </Flex>
      {/* <Tag> Categories</Tag> */}
      <Flex alignItems={"center"} gap="1.5em">
        <Text fontWeight={"bold"}>Categories:</Text>
        <Select placeholder="" onChange={handleFilterByCategories}>
          <option value="All">All</option>
          <option value="doglovers">doglovers</option>
          <option value="catlovers">catlovers</option>
          <option value="coat">coat</option>
          <option value="T-SHIRT">T-SHIRT</option>
          <option value="Harness">Harness</option>
        </Select>
      </Flex>
      {/* <MenuToggle toggle={toggle} isOpen={isOpen} /> */}
    </Flex>
  );
};

export default Sort;
