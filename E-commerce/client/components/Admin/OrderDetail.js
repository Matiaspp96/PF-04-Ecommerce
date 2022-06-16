import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOrderDetail } from "../../redux/actions/admin";
import {
  Text,
  Stack,
  useDisclosure,
  Flex,
  Button,
  Modal,
  FormControl,
  FormLabel,
  Switch,
  Heading,
  Center,
  Grid,
  Image,
  Divider,
} from "@chakra-ui/react";
import CardItem from "../Card/CardItem";
import StatusForm from "./StatusForm";
import axios from "axios";
import { configAxios } from "../../utils/axiosConfig";
import { BASEURL } from "../../redux/actions/products";
import { useRouter } from "next/router";

const OrderDetail = ({ id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const details = useSelector((state) => state.adminReducer.orderDetail);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [status, setStatus] = useState({ statusPay: details.statusPay });
  const [msg, setMsg] = useState("");

  const handleSwitchChange = (e) => {
    let axiosConfig = configAxios();
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async(result) => {
        if (result.isConfirmed) {
          try {
            let response = await axios.put(
              `${BASEURL}/orders/${id}`,
              { statusPay: "cancelled" },
              axiosConfig
            );
            setStatus({ statusPay: "cancelled" });
            setMsg(response.data);
            Swal.fire({
              title: "Modified status!",
              icon: "success",
              confirmButtonText: "Cool",
            }).then((result) => {
              router.reload(window.location.pathname);
            });
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong",
            });
            setMsg(error);
          }
        }
      })
  };

  useEffect(() => {
    dispatch(getOrderDetail(id));
  }, [dispatch, id]);

  return (
    <>
      {details.buyer && (
        <Stack w="100%">
          <Flex
            zIndex="1"
            flexDir={["column", "row"]}
            ml={["0.5em", "0.5em", "2em", "2em"]}
            justify="center"
          >
            <Flex
              flexDir="column"
              minW="25%"
              gap="2em"
              p={["1rem", "3rem"]}
              border="1px solid #348099"
              borderRadius="20px"
              boxShadow="xl"
              bgColor={"white"}
            >
              {/* <Heading as='h4' size='md'>Shipping information</Heading> */}
              <Heading as="h4" size="md">
                Buyer information
              </Heading>
              <Stack>
                <Text fontWeight={"bold"}>Name</Text>
                <Text>{details.buyer.name}</Text>
                <Text fontWeight={"bold"}>Email</Text>
                <Text>{details.buyer.email}</Text>
                <Text fontWeight={"bold"}>Phone</Text>
                <Text>{details.phone}</Text>
              </Stack>
              <Heading as="h4" size="md">
                Shipping information
              </Heading>
              <Stack>
                <Text fontWeight={"bold"}>State</Text>
                <Text>{details.shipping.state}</Text>
                <Text fontWeight={"bold"}>Street address</Text>
                <Text>{details.shipping.street} </Text>
                <Text fontWeight={"bold"}>Postal Code</Text>
                <Text>{details.shipping.zip}</Text>
              </Stack>
            </Flex>
            <Stack
              zIndex="1"
              boxShadow="lg"
              //  bgColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
              w={["100%", "30%"]}
              mt={{ base: "5em", md: "0" }}
              p="1.5rem"
              borderRadius="15px"
              bgColor={"white"}
            >
              <Center>
                <Heading as="h4" size="md">
                  Order
                </Heading>
              </Center>
              {console.log(details)}
              <Stack maxH={'60vh'} overflow={'auto'}>
                {details.products.map((ps) => {
                  return (
                    <Flex key={ps._id}>
                      <Stack>
                        <Center>
                          <Image src={ps.image} maxW={"40%"}></Image>
                        </Center>

                        <Text textAlign={"center"}>{ps.name}</Text>
                      </Stack>
                      <Stack justifyContent={"center"}>
                        <Flex>
                          <Text color={"#1884BE"}>Quantity</Text>
                          <Text ml={"1rem"}>{ps.quantity}</Text>
                        </Flex>
                        <Flex>
                          <Text color={"#1884BE"}>Price</Text>
                          <Text ml={"1rem"}>${ps.price}</Text>
                        </Flex>
                      </Stack>
                    </Flex>
                  );
                })}
              </Stack>
              <Divider></Divider>
              <Text fontWeight="bold" textAlign={"end"}>
                Total: ${details.cost}
              </Text>

              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Stack>
                  <Text fontWeight={"bold"}>Payment Status</Text>
                  <Text>{details.statusPay}</Text>
                </Stack>
               
                <Stack>
                 
            
                    <Button
                    id="cancelled"
                    bgColor={"#1884BE"}
                    borderRadius={"none"}
                    boxShadow="xl"
                    color={"white"}
                    onClick={handleSwitchChange}
                    isDisabled={
                      details.statusPay === "cancelled" ? true : false
                    }>
                      Cancel Order
                    </Button>
                    
                </Stack>
              </Flex>

              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Stack mt={'1rem'}>
                  <Text fontWeight={"bold"}>Purchase Status</Text>
                <Text>{details.statusPurchase}</Text>
                </Stack>
                
                <Button
                  bgColor={"#1884BE"}
                  borderRadius={"none"}
                  boxShadow="xl"
                  color={"white"}
                  onClick={onOpen}
                >
                  Change
                </Button>
              </Flex>
            </Stack>
          </Flex>
          <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
            <StatusForm
              onClose={onClose}
              id={id}
              currentStatus={details.statusPurchase}
            />
          </Modal>
        </Stack>
      )}
    </>
  );
};

export default OrderDetail;
