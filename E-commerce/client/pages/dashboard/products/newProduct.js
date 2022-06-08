import ProductForm from "../../../components/Admin/ProductForm";
import Sidebar from "../../../components/Navbar/Sidebar";
import { Flex, Stack, Text, Button, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const NewProduct = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let localUser = {};
    if (localStorage.getItem("userInfo")) {
      localUser = JSON.parse(localStorage.getItem("userInfo"));
    }
    if (Object.keys(localUser).length !== 0) {
      setUser(localUser.role);
    }
  });

  return (
    <>
      {user === "admin" ? (
        <Flex>
          <Sidebar size={"small"} />
          <ProductForm></ProductForm>
        </Flex>
      ) : (
        <Center h={'100vh'}>
        <Stack justifyItems={'center'}>
          <Text textAlign={'center'}>Access denied. You are not an Admin</Text>
          <Text textAlign={"center"}>
            Think this is an error? Contact Support
          </Text>
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Button>
        </Stack>
    </Center>
      )}
    </>
  );
};

export default NewProduct;
