import axios from "axios";
import {
  Flex,
  Text,
  Divider,
  Avatar,
  Heading,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { FiHome, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoPawOutline } from "react-icons/io5";
import { getUserData } from "../../redux/actions/user";
import { BASEURL } from "../../redux/actions/products.js";
import SidebarItem from "./SidebarItem";
import {
  AiOutlineShopping,
  AiOutlineDashboard,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { useRouter } from "next/router";

const Sidebar = ({ size }) => {
  const [navSize, changeNavSize] = useState(size);
  const [user, setUser] = useState({});
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = localStorage.getItem("userInfo");
    const userActive = JSON.parse(localUser);
    let configAxios = {};

    if (userActive) {
      configAxios = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${userActive.token}`,
        },
      };
      (async () => {
        const userResponse = await axios.get(
          `${BASEURL}/users/${userActive._id}`,
          configAxios
        );
        setUser(userResponse.data.data);
      })();
    } else {
      router.push("/notAllow");
    }
  }, [router]);

  useEffect(() => {
    dispatch(getUserData(user));
  }, [dispatch, user]);

  return (
    <>
      {user.role && (
        <Flex
          bgColor="#1884BE"
          pos="sticky"
          h='auto'
          minH={'100vh'}
          w={navSize === "small" ? "6vw" : "13vw"}
          flexDir="column"
          justifyContent="space-between"
          px={3}
        >
          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
          >
            <Flex mt={4} align="center">
              <Avatar size="sm" src={user.avatar} alt={user.name} />
              <Flex
                flexDir="column"
                ml={4}
                display={navSize == "small" ? "none" : "flex"}
              >
                <Heading as="h3" size="sm" color="white">
                  {user.name}
                </Heading>
                <Text color="white">Admin</Text>
              </Flex>
            </Flex>
            <Divider display={navSize == "small" ? "none" : "flex"} />
          </Flex>

          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
            as="nav"
            mb={2}
          >
            <IconButton
              icon={
                navSize === "small" ? (
                  <AiOutlineMenuUnfold />
                ) : (
                  <AiOutlineMenuFold />
                )
              }
              bgColor={"transparent"}
              color={"white"}
              ml={navSize === "large" ? ".3rem" : "none"}
              _hover={{ color: "black" }}
              onClick={() => {
                if (navSize == "small") changeNavSize("large");
                else changeNavSize("small");
              }}
            />
            <SidebarItem
              navSize={navSize}
              icon={<FiHome />}
              title="Home"
              route={"/"}
            />
            <SidebarItem
              navSize={navSize}
              icon={<AiOutlineDashboard />}
              title="Dashboard"
              route={"/dashboard"}
            />
            <SidebarItem
              navSize={navSize}
              icon={<IoPawOutline />}
              title="Products"
              route={"/dashboard/products"}
            />
            <SidebarItem
              navSize={navSize}
              icon={<FiUser />}
              title="Ussers"
              route={"/dashboard/ussers"}
            />
            <SidebarItem
              navSize={navSize}
              icon={<AiOutlineShopping />}
              title="Orders"
              route={"/dashboard/orders"}
            />
          </Flex>

          <Flex justifyContent={"center"}>
            <Image src={"/Logo.png"} alt={'Pet Elegant Logo'}w={"6rem"} mb={5} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Sidebar;
