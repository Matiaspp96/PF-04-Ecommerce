import Swal from "sweetalert2";
import axios from "axios";
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
import Link from "next/link";

import { useState, useEffect } from "react";
import { FaEdit, FaRandom } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { getAllCategories } from "../../redux/actions/categories";
import { BASEURL } from "../../redux/actions/products";
import { configAxios } from "../../utils/axiosConfig";
import { useDispatch, useSelector } from "react-redux";

const ProductTable = ({ products }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categoriesReducer.categories);

 const getCategoryName = (id)=>{
  let cat;
  categories.map(cs=>{
    if(cs._id === id){
      cat = cs.name
    }
  });
  return cat
 }

  const deleteItem = (id) => {
    let axiosConfig = configAxios();

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const response = axios.delete(`${BASEURL}/products/${id}`, axiosConfig);
          setMensaje(response.data);
          console.log(response.data);
        }
      })
      .then(() => {
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      })
      .then(() => {
        router.push("/dashboard");
      });
  };

  return (
    <Box px={"1rem"}>
      {products && (
        <Table variant="simple" overflow={"none"}>
          <Thead>
            <Tr>
              <Th p={1} textAlign={"center"}>
                Image
              </Th>
              <Th p={1}> Title</Th>
              <Th p={1} textAlign={"center"}>
                Category
              </Th>
              <Th p={1} textAlign={"center"}>
                Stock
              </Th>
              <Th p={1} textAlign={"center"}>
                Price
              </Th>
              <Th p={1} textAlign={"center"}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((ps) => {
              return (
                <Tr key={ps.name}>
                  <Td p={1}>
                    <Center>
                      <Image src={ps.image} boxSize={"50px"} alt={ps.name} />
                    </Center>
                  </Td>
                  <Td p={1}>
                    <Link
                      href={{
                        pathname: "/product/[id]",
                        query: { id: ps._id },
                      }}
                    >
                      <a>
                        <Text
                          fontSize="md"
                          _hover={{ color: "#1884BE", fontWeight: "bold" }}
                        >
                          {ps.name}
                        </Text>
                      </a>
                    </Link>
                  </Td>
                  <Td p={1} textAlign={"center"}>
                    {categories && ps.category?.map((cs,idx)=>{
                      return <Text key={cs+idx}>{getCategoryName(cs)}</Text>})}
                  </Td>
                  <Td p={1} textAlign={"center"}>
                    {ps.stock}
                  </Td>
                  <Td p={1} textAlign={"center"}>
                    ${ps.price}
                  </Td>
                  <Td p={1}>
                    <Stack>
                      <Tooltip label="Edit" hasArrow arrowSize={15}>
                        <IconButton
                          onClick={() => {
                            router.push(`/dashboard/products/${ps._id}`);
                          }}
                          colorScheme="blue"
                          variant="outline"
                          icon={<FaEdit />}
                        />
                      </Tooltip>

                      <Tooltip label="Delete" hasArrow arrowSize={15}>
                        <IconButton
                          ml={"1rem"}
                          onClick={() => deleteItem(ps._id)}
                          colorScheme="blue"
                          variant="outline"
                          icon={<IoTrashOutline />}
                        />
                      </Tooltip>
                    </Stack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default ProductTable;
