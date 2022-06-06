import ProductForm from "../../../components/Admin/ProductForm";
import Sidebar from "../../../components/Navbar/Sidebar";
import { Flex } from "@chakra-ui/react";

const NewProduct = () => {
  return (
    <Flex>
      <Sidebar size={"small"} />
      <ProductForm></ProductForm>
    </Flex>
  );
};

export default NewProduct;
