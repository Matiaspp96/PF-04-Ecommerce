import { Box, Button, LightMode, Stack, Text, Select } from '@chakra-ui/react'
import Link from 'next/link'
import {React, useState} from 'react'
import { IoCartOutline } from 'react-icons/io5'
import { GoClippy } from "react-icons/go";
import {filterByCategory} from "../../redux/actions/categories"
import { useSelector, useDispatch } from "react-redux";

const MenuLinks = ({isOpen}) => {

  const [, setCategories] = useState('')
  const dispatch = useDispatch()
  const totalCategories = useSelector((state) => state.categories);

  const handleFilterByCategories = (e) => {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
    setCategories(e.target.value);
  }

    return (
        <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }} >
        <Stack
            spacing={4}
            align="center"
            justify={["center", "space-between", "flex-end", "flex-end"]}
            direction={["column", "row", "row", "row"]}
            pt={[4, 4, 0, 0]}>
                <Text><Link href="/">Home</Link></Text>
                {/* <Text><Link href="/product/categories">Categories</Link></Text> */}
                <Text><Link href="/favorites">Favorites</Link></Text>
                <Select
                 placeholder="Categories"
                 onChange={(e) => handleFilterByCategories(e)}>
                    <option value='All'>All</option>
                    {totalCategories && 
                      totalCategories
                      .sort(function(a, b) {
                        if(a.category < b.category) return -1
                        if (a.category > b.category) return 1;
                        return 0
                      }) 
                      .map((t) => {
                        <option value={t.category} key={t.category}>
                          {t.category}
                        </option>
                    })}

                </Select>
                {/* <Link href="/orders"><Button w='fit-content' borderRadius='15px'><GoClippy size='1.5em' />Orders</Button></Link> */}
                <Link href="/cart"><Button  color='blackAlpha.800' borderRadius='15px' p='0'><IoCartOutline size='2em'/></Button></Link>
                <Link href="/cart"><Button  color='blackAlpha.800' borderRadius='15px' p='0.5em'>Log in</Button></Link>
            </Stack>
        </Box>
    )
  }

export default MenuLinks
