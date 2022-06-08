import ProductForm from "../../../components/Admin/ProductForm";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Navbar/Sidebar";
import { Flex, Center, Stack, Text, Button,  } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

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
    {user==='admin'?
    <Flex>
    <Sidebar size={"small"} />
    {id && <ProductForm id={id}></ProductForm>}
  </Flex> :
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
    }
    </>
    
  );
};

export default EditPage;
