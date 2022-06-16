import { Text, Stack, Button, Flex, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../../../components/Navbar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../../redux/actions/admin.js";
import OrdersTable from "../../../components/Table/OrdersTable";
import PaginationDisplayer from "../../../components/Pagination/PaginationDisplayer";
import FilterOrders from "../../../components/Sort/FilterOrders";

const Orders = () => {
  const router = useRouter();
  const elements = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const totalOrders = useSelector((state) => state.adminReducer.totalOrders);


  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

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
        <Flex justifyContent={"space-between"}>
          <Sidebar size={"large"} />
          <Stack w={'100%'} >
            <FilterOrders setCurrentPage={setCurrentPage} />
            <PaginationDisplayer products={totalOrders} elements={elements} setCurrentPage={setCurrentPage} currentPage={currentPage} Component={OrdersTable}/>
            
          </Stack>
        </Flex>
      )}
    </>
  );
};

export default Orders;
