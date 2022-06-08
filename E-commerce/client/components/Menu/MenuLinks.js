import {
  Box,
  Button,
  LightMode,
  Stack,
  Text,
  Select,
  Badge,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { React, useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { GoClippy } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { getTotalItems } from '../../redux/actions/cart';
import { useRouter } from 'next/router';
import ColorModeSwitch from "../ColorMode/ColorSwitch";
import cookie from 'js-cookie'

const MenuLinks = ({ isOpen }) => {
  const dispatch = useDispatch();
  const numberItems = useSelector(
    (state) => state.shoppingCartReducer.totalItems
  );

  const [user, setUser] = useState(null);

    const router = useRouter()
        const handleLogOut = ()=>{
        localStorage.removeItem('userInfo');
        router.push(`${process.env.API_URL}/auth/logout`)
        };


  useEffect(() => {
   
    let localUser = {};
      if(localStorage.getItem('userInfo')){
         localUser = JSON.parse(localStorage.getItem('userInfo'));
      }
         console.log(localUser)
      if(Object.keys(localUser).length !== 0){
         setUser(localUser.role)
         
       }
 
  });

  useEffect(() => {
    dispatch(getTotalItems());
  }, [dispatch]);



  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      {console.log(user)}
      <Flex
        flexDir="row"
        spacing={4}
        align="center"
        gap={{ lg: "1em" }}
        justify={["space-between", "space-between", "flex-end", "center"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <Text>
          <Link href="/">Home</Link>
        </Text>
        {/* <Text><Link href="/product/categories">Categories</Link></Text> */}
        <Text>
          <Link href="/favorites">Favorites</Link>
        </Text>
        <ColorModeSwitch />
        {/* <Link href="/orders"><Button w='fit-content' borderRadius='15px'><GoClippy size='1.5em' />Orders</Button></Link> */}
        <Link href="/cart">
          <Button
            pos="relative"
            color="blackAlpha.800"
            borderRadius="50%"
            p="0"
          >
            <IoCartOutline size="2em" />
            <Badge
              pos="absolute"
              w="1.5em"
              h="1.5em"
              display="flex"
              alignItems="center"
              justifyContent="center"
              top="-5px"
              bgColor="#72B9E5"
              borderRadius="50%"
              right="-5px"
            >
              {numberItems}
            </Badge>
          </Button>
        </Link>
        {/* <Link href="/api/auth/signin"><Button  color='blackAlpha.800' borderRadius='15px' p='1em'>Log in</Button></Link> */}
        {user ? (
          
            <Button onClick ={handleLogOut}color="blackAlpha.800" borderRadius="15px" p="1em">
              Log out
            </Button>
         
        ) : (
          <Link href="/login">
            <Button color="blackAlpha.800" borderRadius="15px" p="1em">
              Log in
            </Button>
          </Link>
        )}
        {user === "admin" && (
          <Link href="/dashboard">
            <Button color="blackAlpha.800" borderRadius="15px" p="1em">
              Control Panel
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default MenuLinks;
