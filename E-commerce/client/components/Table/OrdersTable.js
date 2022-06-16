import {
    Table,
    Box,
    Center,
    Thead,
    Stack,
    Tbody,
    Tr,
    Th,
    Td,
    Image,
    IconButton,
    Text,
    Tooltip,
  } from "@chakra-ui/react";
  import { FaEdit} from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const OrdersTable = ({products}) => {
    const router = useRouter()
  return (
    <Box px={"1rem"} >
      {products && (
        <Table variant="simple" overflow={"none"} mt={'2rem'}>
          <Thead>
            <Tr>
              <Th p={1}>
                Buyer name
              </Th>
              <Th p={1} textAlign={"center"}>
                Products
              </Th>
              <Th p={1} textAlign={"center"}>
                Payment Status
              </Th>
              <Th p={1} textAlign={"center"}>
                Purchase Status
              </Th>
              <Th p={1} textAlign={"center"}>
                Cost
              </Th>
              <Th p={1} textAlign={"center"}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((os) => {
              return (
                <Tr key={os._id}>
                  <Td p={1}>
                    {os.buyer?.name}
                  </Td>
                  <Td p={1} textAlign={"center"}>
                  {os.products.map(ps=>{return <Text key={ps.name}>{ps.name}</Text>})}
                  </Td>
                  <Td p={1} textAlign={"center"}>
                    {os.statusPay}
                  </Td>
                  <Td p={1} textAlign={"center"}>
                    {os.statusPurchase}
                  </Td>
                  <Td p={1} textAlign={"center"}>
                    ${os.cost}
                  </Td>
                  <Td p={1}>
                    <Stack>
                      <Tooltip label="Edit" hasArrow arrowSize={15}>
                        <IconButton
                          onClick={() => {
                            router.push(`/dashboard/orders/${os._id}`);
                          }}
                          colorScheme="blue"
                          variant="outline"
                          icon={<FaEdit />}
                        />
                      </Tooltip>

                      {/* <Tooltip label="Delete" hasArrow arrowSize={15}>
                        <IconButton
                          ml={"1rem"}
                        //   onClick={() => deleteItem(ps._id)}
                          colorScheme="blue"
                          variant="outline"
                          icon={<IoTrashOutline />}
                        />
                      </Tooltip> */}
                    </Stack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}

export default OrdersTable
