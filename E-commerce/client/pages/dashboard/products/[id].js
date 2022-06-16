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
    if (Object.keys(localUser).length !== 0 && localUser.role === 'admin') {
      setUser(localUser.role);
    }   
    else{
      router.push("/notAllow");
    }
  },[router]);

  return (
    <>
    {user &&
    <Flex>
    <Sidebar size={"small"} />
    {id && <ProductForm id={id}></ProductForm>}
  </Flex> 
    }
    </>
    
  );
};

export default EditPage;
