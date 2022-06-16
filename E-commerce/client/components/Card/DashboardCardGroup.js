import CardDashboard from "./CardDashboard"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from "../../redux/actions/user";
import { getAllProducts } from "../../redux/actions/products";
import { getAllOrders } from "../../redux/actions/admin";
import { SimpleGrid } from "@chakra-ui/react";

const DashboardCardGroup = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.userReducer.users);
    const products = useSelector((state) => state.productReducer.products);
    const orders = useSelector((state) => state.adminReducer.totalOrders);

    const getTotalRevenue = (orders)=>{
        const revenues=0;
        orders.map(or=>{
            if(or.statusPay === "approved"){
                revenues = revenues + or.cost
            }
        })
        return revenues;
    }

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getAllProducts())
        dispatch(getAllOrders())
    }, [dispatch]);



  return (
    <> 
    {orders.length && users.length && products.length &&
    <SimpleGrid columns={3}>
        <CardDashboard title={'Total users'} data={users.length} color ={'#004FB7'} />
        <CardDashboard title={'Total products'} data={products.length} color={'#983800'} />
        <CardDashboard title={'Total revenues'} data={'$'+getTotalRevenue(orders)} color={'#00661B'} />
    </SimpleGrid>
     }
    </>
    
  )
}

export default DashboardCardGroup