import { Text, Stack, Button, Flex, Box, Avatar, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Navbar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import axios from "axios";
import { BASEURL } from "../../redux/actions/categories";
import { configAxios } from "../../utils/axiosConfig";
import UserCard from "../Card/UserCard";

const UsersList = ({products}) => {

  return (
    <>
      {products && (
          <SimpleGrid columns={3} w={"100%"} ml={5} spacing={3}>
            {products.map(us=>{return (
                <UserCard key={us.email} user={us} />
            )})}
          </SimpleGrid>
      ) }
    </>
  )
}

export default UsersList