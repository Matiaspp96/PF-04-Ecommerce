import { useRouter } from "next/router";
import OrderDetail from "../../../components/Admin/OrderDetail";
import Sidebar from '../../../components/Navbar/Sidebar';
import { Flex, Center } from "@chakra-ui/react";

const orderDetailPage = () => {
    const router = useRouter()
    const { id } = router.query;

    
  return (
    <Flex>
    <Sidebar size={"small"}/>
    <Center bgColor={"#eceff1"}>
    {id && <OrderDetail id={id} />}
    </Center>
    
    
    </Flex>
  )
}

export default orderDetailPage