import { Button, Image, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import NextLink from "next/link";
import React, { useEffect, useState } from 'react'
import { FaFirstOrder, FaList, FaQuestion, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { IoDocumentSharp } from 'react-icons/io5'
import { BASEURL } from '../../redux/actions/products';

export default function MenuProfile() {
    const [user, setUser] = useState(null);

    const router = useRouter()
    const handleLogOut = ()=>{
    localStorage.removeItem('userInfo');
    router.push(`${BASEURL}/auth/logout`)
    };

    const handleOrders = ()=>{
    router.push(`${proccess.env.HOST_CLIENT}/orders`) // Ruta a order
    };

    const handleMyAccount = ()=>{
    router.push(`${proccess.env.HOST_CLIENT}/user`)
    };


    useEffect(() => {
    
    let localUser = {};
        if(localStorage.getItem('userInfo')){
            localUser = JSON.parse(localStorage.getItem('userInfo'));
        }
        if(Object.keys(localUser).length !== 0){
            setUser(localUser.role)
    
        }
    
    },[]);



    
  return (
    <>
    {user ? (
        <Menu>
        <MenuButton as={Button} color="blackAlpha.800" boxSizing='border-box' w='fit-content'
        paddingStart='0' paddingEnd='0' borderRadius="full">
        <Image
            boxSize='2.5rem'
            borderRadius='full'
            src='https://placekitten.com/100/100'
            alt='Cat'
          />
        </MenuButton>
        <MenuList bgColor='#1884BE'>
            <MenuGroup title='Profile' fontSize='md'>
            <MenuItem icon={<FaUser />} onClick ={handleMyAccount} _hover={{bgColor:'blackAlpha.400'}}>My Account</MenuItem>
            <MenuItem icon={<FaList />} onClick ={handleOrders} _hover={{bgColor:'blackAlpha.400'}}>Orders </MenuItem>
            <MenuItem icon={<FaSignOutAlt />} onClick ={handleLogOut} _hover={{bgColor:'blackAlpha.400'}}>Log Out </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Help' fontSize='md'>
            <MenuItem icon={<IoDocumentSharp />} _hover={{bgColor:'blackAlpha.400'}}>Docs</MenuItem>
            <MenuItem icon={<FaQuestion />} _hover={{bgColor:'blackAlpha.400'}}>FAQ</MenuItem>
            </MenuGroup>
        </MenuList>
        </Menu>
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
    )}
    </>
  )
}
