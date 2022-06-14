import {
  Avatar,
  Center,
  Flex,
  Text,
  Stack,
  Tooltip,
  IconButton,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { BASEURL } from "../../redux/actions/products";
import Swal from "sweetalert2";
import { configAxios } from "../../utils/axiosConfig";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const UserCard = ({ user }) => {
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteUser = (id) => {
    let axiosConfig = configAxios();

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      text: "This will erase all the user data",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${BASEURL}/users/${id}`,
          axiosConfig
        );
        setMensaje(response.data);
        console.log(response.data);
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          router.reload(window.location.pathname);
        });
      }
    });
  };

  const editUser = (role,id) => {
    let axiosConfig = configAxios();
    if(role === 'user'){
      Swal.fire({
        title: "Do you want to make this user an admin?",
        icon: "warning",
        text: "This will grant the user access to the dashboard and he will be able to edit products, users and orders.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.put(
            `${BASEURL}/users/${id}`,{role:"admin"},
            axiosConfig
          );
          setMensaje(response.data);
          console.log(response.data);
          Swal.fire({
            title: "Modified role!",
            text: "The user is now an admin",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            router.reload(window.location.pathname);
          });
        }
      })
    } else {
      Swal.fire({
        title: "Do you want to make this admin a common user?",
        icon: "warning",
        text: "This will prohibit access to the dashboard and he will no longer be able to edit products, users and orders.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.put(
            `${BASEURL}/users/${id}`,{role:"user"},
            axiosConfig
          );
          setMensaje(response.data);
          console.log(response.data);
          Swal.fire({
            title: "Modified role!",
            text: "The admin is now a common user",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            router.reload(window.location.pathname);
          });
        }
      })

    }

  };

  return (
    <Flex
      h={"20vh"}
      maxW={"25vw"}
      w={"full"}
      boxShadow={"2xl"}
      rounded={"md"}
      m={5}
      bgColor={"white"}
    >
      <Center w={"30%"} bgColor={"#1884BE"}>
        <Avatar
          size={"md"}
          src={user.image}
          alt={user.name}
          css={{
            border: "2px solid white",
          }}
        />
      </Center>

      <Center w={"70%"}>
        <Stack spacing={0} align={"center"} m={1}>
          <Text fontSize={"md"} fontWeight={500} fontFamily={"body"}>
            {user.name ? user.name : "No name register"}
          </Text>
          <Text color={"gray.500"} fontSize={"sm"}>
            {user.email}
          </Text>
          <Text>Role: {user.role}</Text>
          <Flex>
            <Tooltip label="Edit" hasArrow arrowSize={15}>
              <IconButton
                onClick={() => {
                  editUser(user.role,user._id);
                }}
                colorScheme="blue"
                variant="ghost"
                icon={<FaEdit />}
              />
            </Tooltip>

            <Tooltip label="Delete" hasArrow arrowSize={15}>
              <IconButton
                ml={"1rem"}
                onClick={() => deleteUser(user._id)}
                colorScheme="blue"
                variant="ghost"
                icon={<IoTrashOutline />}
              />
            </Tooltip>
          </Flex>
        </Stack>
      </Center>
    </Flex>
  );
};

export default UserCard;
