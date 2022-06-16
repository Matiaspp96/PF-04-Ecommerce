import Swal from "sweetalert2";
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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
  Box,
  Tag,
  TagLabel,
  TagRightIcon,
  Tooltip,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../redux/actions/categories.js";
import { configAxios } from "../../utils/axiosConfig.js";
import { BASEURL } from "../../redux/actions/products.js";
import axios from "axios";
import { categoryValidation } from "./formValidations.js";

const CategoryForm = ({ onClose }) => {
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState({ name: "" });
  const [msg, setMsg] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setErrors(categoryValidation(category));
  }, [category]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  const categories = useSelector((state) => state.categoriesReducer.categories);
  
  const handleSubmit = async () => {
    let axiosConfig = configAxios();
    try {
      let response = await axios.post(
        `${BASEURL}/categories`,
        category,
        axiosConfig
      );
      setMsg(response.data);
      onClose();
      Swal.fire({
        title: "Category created!",
        icon: "success",
        confirmButtonText: "Cool",
      });
    } catch (error) {
      setMsg(error);
    }
    setCategory({ name: "" });
  };

  const handleChange = (e) => {
    setCategory({ name: e.target.value });
  };

  const handleDelete = async (id) => {
    let axiosConfig = configAxios();
    onClose();
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await axios.delete(
            `${BASEURL}/categories/${id}`,
            axiosConfig
          );

          setMsg(response.data);
          console.log(response.data);

          Swal.fire("Deleted!", "Category has been deleted.", "success");
        } catch (error) {
          setMsg(error);
        }
      }
    });
  };

  return (
    <>
      <ModalOverlay />
      {categories && (
        <ModalContent bgColor={"#eceff1"}>
          <ModalHeader>Add New Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bgColor={"white"} boxShadow="xl" p={"1rem"}>
              <Text fontWeight={"bold"}>Current categories:</Text>

              {categories.map((cs) => {
                return (
                  <Tag key={cs._id} m={".3rem"} colorScheme={"blue"}>
                    <TagLabel fontSize={"1rem"}>{cs.name}</TagLabel>
                    <Tooltip label="Delete" hasArrow arrowSize={15}>
                      <TagRightIcon
                        as={CloseButton}
                        onClick={() => handleDelete(cs._id)}
                      />
                    </Tooltip>
                  </Tag>
                );
              })}

              <Stack mt={'1rem'}>
                <FormLabel fontWeight={"bold"}>New category:</FormLabel>
                <Input
                  placeholder="Type new category name"
                  type={"text"}
                  onChange={handleChange}
                  value={category.name}
                ></Input>
                {errors.name && <Text color={'red'}>{errors.name}</Text>}
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </>
  );
};

export default CategoryForm;
