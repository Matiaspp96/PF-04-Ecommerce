import ProductForm from "../../../components/Admin/ProductForm";
import { useRouter } from "next/router";
import Sidebar from "../../../components/Navbar/Sidebar";
import { Flex } from "@chakra-ui/react";

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Flex>
      <Sidebar size={"small"} />
      {id && <ProductForm id={id}></ProductForm>}
    </Flex>
  );
};

export default EditPage;
