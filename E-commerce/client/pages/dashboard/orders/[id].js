import { useRouter } from "next/router";
import OrderDetail from "../../../components/Admin/OrderDetail";
import Sidebar from "../../../components/Navbar/Sidebar";
import { Flex, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const OrderDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    let localUser = {};
    if (localStorage.getItem("userInfo")) {
      localUser = JSON.parse(localStorage.getItem("userInfo"));
    }
    if (Object.keys(localUser).length !== 0 && localUser.role === "admin") {
      setUser(localUser.role);
    } else {
      router.push("/notAllow");
    }
  }, [router]);

  return (
    <>
      {user && (
        <Flex>
          <Sidebar size={"small"} />
          <Center bgColor={"#eceff1"}>{id && <OrderDetail id={id} />}</Center>
        </Flex>
      )}
    </>
  );
};

export default OrderDetailPage;
