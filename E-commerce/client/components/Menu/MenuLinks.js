import {
  Box,
  Button,
  LightMode,
  Stack,
  Text,
  Select,
  Badge,
  Flex,
  Icon,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { React, useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { BiBone, BiHeart } from "react-icons/bi";
import { GiDogHouse } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import { getTotalItems } from '../../redux/actions/cart';
import ColorModeSwitch from "../ColorMode/ColorSwitch";

const MenuLinks = ({ isOpen }) => {
  const dispatch = useDispatch();
  const numberItems = useSelector(
    (state) => state.shoppingCartReducer.totalItems
  );

  // const [user, setUser] = useState(null);

  // const router = useRouter()
  // const handleLogOut = ()=>{
  // localStorage.removeItem('userInfo');
  // router.push(`${BASEURL}/auth/logout`)
  // };


  // useEffect(() => {
   
  //   let localUser = {};
  //     if(localStorage.getItem('userInfo')){
  //        localUser = JSON.parse(localStorage.getItem('userInfo'));
  //     }
  //     if(Object.keys(localUser).length !== 0){
  //        setUser(localUser.role)
         
  //      }
 
  // },[]);

  useEffect(() => {
    dispatch(getTotalItems());
  }, [dispatch]);



  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Flex
        flexDir="row"
        spacing={4}
        align="center"
        gap={{base:'0.5rem', lg: "1em" }}
        justify={["space-between", "space-between", "flex-end", "center"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <NextLink href="/">
          <Link display='flex' alignItems='baseline' gap='0.1rem'><GiDogHouse/>Home</Link>
        </NextLink>
        
        {/* <Text><Link href="/product/categories">Categories</Link></Text> */}
        <NextLink href="/favorites">
          <Link display='flex' alignItems='baseline' gap='0.1rem'><BiHeart/>Favorites</Link>
        </NextLink>
        <ColorModeSwitch />
        {/* <Link href="/orders"><Button w='fit-content' borderRadius='15px'><GoClippy size='1.5em' />Orders</Button></Link> */}
        <NextLink href="/cart">
          <Link pos="relative" >
            <IoCartOutline size="2em" />
            <Badge
              pos="absolute"
              w="1.5em"
              h="1.5em"
              display="flex"
              alignItems="center"
              justifyContent="center"
              top="-5px"
              color='whiteAlpha.800'
              bgColor='twitter.800'
              borderRadius="50%"
              right="-5px"
            >
              {numberItems}
            </Badge>
          </Link>
        </NextLink>
        {/* <Link href="/api/auth/signin"><Button  color='blackAlpha.800' borderRadius='15px' p='1em'>Log in</Button></Link> */}
        {/* {user ? (
          
            <Button onClick ={handleLogOut}color="blackAlpha.800" borderRadius="15px" p="1em">
              Log out
            </Button>
         
        ) : (
          <NextLink href="/login">
            <Button color="blackAlpha.800" borderRadius="15px" p="1em">
              Log in
            </Button>
          </NextLink>
        )}
        {user === "admin" && (
          <NextLink href="/dashboard">
            <Button color="blackAlpha.800" borderRadius="15px" p="1em">
              Control Panel
            </Button>
          </NextLink>
        )} */}
      </Flex>
    </Box>
  );
};

export default MenuLinks;
