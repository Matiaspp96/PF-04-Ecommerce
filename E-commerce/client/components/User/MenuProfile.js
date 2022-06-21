import { Button, Image, Link, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import NextLink from "next/link";
import React, { useEffect, useState } from 'react'
import { FaFirstOrder, FaList, FaQuestion, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { IoDocumentSharp } from 'react-icons/io5'
import { BASEURL, HOSTURL } from '../../redux/actions/products';
import { BsPersonLinesFill } from 'react-icons/bs';

export default function MenuProfile() {
    const [user, setUser] = useState(null);

    const router = useRouter()
    const handleLogOut = ()=>{
    localStorage.removeItem('userInfo');
    router.push(`${BASEURL}/auth/logout`)
    };

    const handleOrders = ()=>{
    router.push(`${HOSTURL}/orders`) // Ruta a order
    };

    const handleMyAccount = ()=>{
    router.push(`${HOSTURL}/user/${user._id}`)
    };

    const handleAdmin = ()=>{
    router.push(`${HOSTURL}/dashboard`)
    };

    useEffect(() => {
    let localUser = {};
        if(localStorage.getItem('userInfo')){
            localUser = JSON.parse(localStorage.getItem('userInfo'));
        }
        if(Object.keys(localUser).length !== 0){
            setUser(localUser)
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
            src={user.avatar ? user.avatar : 'https://placekitten.com/100/100'}
            alt='Cat'
          />
        </MenuButton>
        <MenuList bgColor='#1884BE'>
            <MenuGroup title={`Hi ${user.name}`} fontSize='md'>
            <MenuItem icon={<FaUser size='1.2rem' />} _focus='blackAlpha.400' onClick ={handleMyAccount} _hover={{bgColor:'blackAlpha.400'}}>My Account</MenuItem>
            <MenuItem icon={<FaList size='1.2rem'/>} _focus='blackAlpha.400' onClick ={handleOrders} _hover={{bgColor:'blackAlpha.400'}}>Orders </MenuItem>
            <MenuItem icon={<FaSignOutAlt size='1.2rem'/>} _focus='blackAlpha.400' onClick ={handleLogOut} _hover={{bgColor:'blackAlpha.400'}}>Log Out </MenuItem>
            {user.role === 'admin' ? (<MenuItem icon={<BsPersonLinesFill size='1.2rem'/>} _focus='blackAlpha.400' onClick ={handleAdmin} _hover={{bgColor:'blackAlpha.400'}}>Control Panel </MenuItem>) : null}
            </MenuGroup>
        </MenuList>
        </Menu>
    ) : (
      <NextLink href="/login">
        <Link pos="relative" >
            <FaUser size="1.2em" />
          </Link>
      </NextLink>
    )}
    </>
  )
}
