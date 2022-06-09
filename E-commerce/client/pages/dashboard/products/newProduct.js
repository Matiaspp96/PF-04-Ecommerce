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
    if (Object.keys(localUser).length !== 0 && localUser.role === 'admin') {
      setUser(localUser.role);
    }
    else{
      router.push("/notAllow");
    }
  },[router]);

  return (
    <>
      {user && (
        <Flex>
          <Sidebar size={"small"} />
          <ProductForm></ProductForm>
        </Flex>
      )}
    </>
  );
};

export default NewProduct;
