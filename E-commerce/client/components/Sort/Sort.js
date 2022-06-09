import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderProducts } from "../../redux/actions/products";
import { filterByCategory } from "../../redux/actions/categories";
import { Flex, Text, Select, Button, MenuList, MenuItemOption, Menu, MenuButton, MenuOptionGroup, Image } from "@chakra-ui/react";
import {ChevronDownIcon} from '@chakra-ui/icons'

const Sort = ({ setCurrentPage, setSort }) => {
  const [categories, setCategories] = useState("");
  const dispatch = useDispatch();

  const handleSort= (e) => {
    setSort(e)
    dispatch(orderProducts(e));
    setCurrentPage(1)
  };

  const handleFilterByCategories = (e) => {
    setCurrentPage(1)
    dispatch(filterByCategory(e));
  }

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
            <MenuItemOption value='All'>
              <Image 
                boxSize='4rem'
                borderRadius='full'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReClGeOih4N829qKUFLSJiBruKnh8YHYLvQA&usqp=CAU'
                alt='Fluffybuns the destroyer'
                mr='15px'
                />
              <span>All</span>
            </MenuItemOption>
            <MenuItemOption value='doglovers'>
              <Image 
              boxSize='4rem'
              borderRadius='full'
              src='https://sc04.alicdn.com/kf/Hd3400a17d69f41c7ba01a2ed6097ad0am.png'
              alt='Fluffybuns the destroyer'
              mr='15px'
              />
              <span>Dog Lovers</span>
            </MenuItemOption>
            <MenuItemOption value='catlovers'>
              <Image 
              boxSize='4rem'
              borderRadius='full'
              src='https://as2.ftcdn.net/v2/jpg/02/61/28/85/1000_F_261288506_hEV7OFNfF2UJSx4VZGzUynJXSz2Uh0yE.jpg'
              mr='15px'
              />
              <span>Cat Lovers</span>
            </MenuItemOption>
            <MenuItemOption value='coat'>
              <Image 
              boxSize='4rem'
              borderRadius='full'
              src='https://ae01.alicdn.com/kf/Hde1a20dabc8a41629a604454e568e348J/Winter-Cat-Dog-Clothes-Warm-Christmas-Dog-Cat-Sweater-For-Small-Dogs-Cats-Yorkies-Chihuahua-Pet.jpg_Q90.jpg_.webp'
              mr='15px'
              />
              <span>Coat</span>
            </MenuItemOption>
            <MenuItemOption value='T-SHIRT'>
              <Image
              boxSize='4rem'
              borderRadius='full'
              src='https://m.media-amazon.com/images/I/81AYBnRdJtL.jpg'
              />
              <span>T-Shirt</span>
            </MenuItemOption>
            <MenuItemOption value='Harness'>
              <Image
              boxSize='4rem'
              borderRadius='full'
              src='https://http2.mlstatic.com/D_NQ_NP_637734-MLA46568321189_062021-O.webp'
              mr='15px'
              />
              <span>Harness</span>
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      {/* <MenuToggle toggle={toggle} isOpen={isOpen} /> */}
    </Flex>
  );
};

export default Sort;
