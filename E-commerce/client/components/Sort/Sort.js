import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderProducts } from "../../redux/actions/products";
import { orderByPrice } from "../../redux/actions/products";
import { orderByName } from "../../redux/actions/products";
import { filterByCategory } from "../../redux/actions/categories";
import { Flex, Text, Select, Button, MenuList, MenuItemOption, Menu, MenuButton, MenuOptionGroup, Image } from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons'
import { getAllCategories } from "../../redux/actions/categories";

const Sort = ({ setCurrentPage, setOrderName, setOrderPrice }) => {
  const [, setCategories] = useState("");
  // const [, setOrderPrice] = useState("");
  // const [, setOrderName] = useState("");

  const dispatch = useDispatch();

  const handleSortName= (e) => {
    setOrderName(e)
    dispatch(orderByName(e)); 
    setCurrentPage(1)
  };

  const handleSortPrice= (e) => {
    setOrderPrice(e)
    dispatch(orderByPrice(e));
    setCurrentPage(1)
  };

  const handleFilterByCategories = (e) => {
    console.log(e)
    setCurrentPage(1)
    setCategories(e);
    dispatch(filterByCategory(e));
  }

  const categories = useSelector((state) => state.categoriesReducer.categories);

  const getCategoryName = (id)=>{
  let cat;
  categories.map(cs=>{
    if(cs._id === id){
      cat = cs.name
    }
  });
    return cat
  }

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <Flex
      justifyContent={{ base: "center" }}
      h={{ base: "8em", lg: "3em" }}
      gap="1em"
      flexDir={{ base: "column", lg: "row" }}
      whiteSpace="nowrap"
      w={{base: '95%', md:'80%', lg:'80%'}}
      mt={{base: '.5em', md:'1em', lg:'1em'}}
      minW={{base:'75%' ,md:'100%', lg:'100%'}} 
      maxW='100%'
    >
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Sort by
        </MenuButton>
        <MenuList  minW='140px' maxW='140px'>
          <MenuOptionGroup 
            justifyContent='center'
            alignContent='center'
            type='radio'
            onChange={handleSortPrice}
            title='Price'
            defaultValue='MIN'>
            <MenuItemOption value='MIN'>Lower price</MenuItemOption>
            <MenuItemOption value='MAX'>Higher price</MenuItemOption>
          </MenuOptionGroup>
          <MenuOptionGroup 
            justifyContent='center'
            alignContent='center'
            type='radio'
            onChange={handleSortName}
            title='Order'
            defaultValue='A-Z'>
            <MenuItemOption value='A-Z'>A-Z</MenuItemOption>
            <MenuItemOption value='Z-A'>Z-A</MenuItemOption>
            </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Categories
        </MenuButton>
        <MenuList  minW='140px' maxW='140px'>
          <MenuOptionGroup 
            justifyContent='center'
            alignContent='center'
            type='radio' // type='checkbox'
            onChange={handleFilterByCategories}
            defaultValue='All'>
            <MenuItemOption value='All'>All</MenuItemOption>
            {categories && categories.map((e) => (
              <MenuItemOption key={e._id} value={e._id}>
                {getCategoryName(e._id)}
              </MenuItemOption> 
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      {/* <MenuToggle toggle={toggle} isOpen={isOpen} /> */}
    </Flex>
  );
};

export default Sort;
