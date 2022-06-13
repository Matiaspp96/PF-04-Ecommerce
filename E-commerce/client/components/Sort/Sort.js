import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderProducts } from "../../redux/actions/products";
import { filterByCategory } from "../../redux/actions/categories";
import { Flex, Text, Select, Button, MenuList, MenuItemOption, Menu, MenuButton, MenuOptionGroup, Image } from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons'
import { getAllCategories } from "../../redux/actions/categories";

const Sort = ({ setCurrentPage, setSort }) => {
  const [, setCategories] = useState("");
  const dispatch = useDispatch();

  const handleSort= (e) => {
    setSort(e)
    dispatch(orderProducts(e));
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
      ml={{base: '.5em'}}
      mr={{base: '.5em'}}
      minW='100%' 
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
            onChange={handleSort}>
            <MenuItemOption value='MIN'>Lower price</MenuItemOption>
            <MenuItemOption value='MAX'>Higher price</MenuItemOption>
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
            type='radio'
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
