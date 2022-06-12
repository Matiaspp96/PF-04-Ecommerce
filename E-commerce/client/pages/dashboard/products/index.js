import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../redux/actions/products.js";

import {
  Flex,
  Center,
  Stack,
  Heading,
  Progress,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  Text,
} from "@chakra-ui/react";
import { IoReloadOutline } from "react-icons/io5";
import Sidebar from "../../../components/Navbar/Sidebar.js";
import ProductTable from "../../../components/Table/ProductTable.js";
import PaginationDisplayer from "../../../components/Pagination/PaginationDisplayer.js";
import Search from "../../../components/Searchbar/Search.js";
import Sort from "../../../components/Sort/Sort.js";
import CategoryForm from '../../../components/Admin/CategoryForm.js';

const Products = () => {
  const elements = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  const dispatch = useDispatch();
  const router = useRouter();
  const products = useSelector((state) => state.productReducer.products);
  

  const reload = () => {
    dispatch(getAllProducts());
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  

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
        <Flex justifyContent={"space-between"}>
          <Sidebar size={"large"} />
          <Stack w={"100%"}>
            {products.length ? (
              <Stack>
                <Flex
                  bgColor="#1884BE"
                  alignItems={"center"}
                  justifyContent={"center"}
                  p={".9rem"}
                >
                  <IconButton
                    icon={<IoReloadOutline />}
                    onClick={reload}
                    me={"1rem"}
                  />
                  <Search />
                  <Button
                    onClick={() =>
                      router.push("/dashboard/products/newProduct")
                    }
                    w={"8rem"}
                    ml={"1rem"}
                  >
                    New Product
                  </Button>
                  <Button
                    w={"8rem"}
                    ml={"1rem"}
                    onClick={onOpen}
                  >
                    New Category
                  </Button>
                </Flex>

                <Sort
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setSort={setSort}
                />

                <PaginationDisplayer
                  products={products}
                  elements={elements}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  Component={ProductTable}
                />

                <Modal isOpen={isOpen} onClose={onClose} >
                  <CategoryForm onClose={onClose}/>
                </Modal>
              </Stack>
            ) : (
              <Center h={"100vh"}>
                <Stack>
                  <Heading>Just a moment</Heading>
                  <Progress size="md" isIndeterminate />
                </Stack>
              </Center>
            )}
          </Stack>
        </Flex>
      )}
    </>
  );
};

export default Products;
