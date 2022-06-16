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
  Checkbox,
  FormControl,
} from "@chakra-ui/react";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { configAxios } from "../../utils/axiosConfig";
import { BASEURL } from "../../redux/actions/products";
import { useRouter } from "next/router";



const StatusForm = ({ id, onClose, currentStatus }) => {
    const router = useRouter();
  const [status, setStatus] = useState({ statusPurchase: currentStatus });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setStatus({ statusPurchase: e.target.id });
  };

  const handleSubmit = () => {
    let axiosConfig = configAxios();
    onClose();
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
            status,
            axiosConfig
          );
          setMsg(response.data);
          onClose();
          Swal.fire({
            title: "Modified status!",
            icon: "success",
            confirmButtonText: "Cool",
          })
          .then((result) => {
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
  return (
    <>
      <ModalOverlay />
      {console.log( msg)}
      <ModalContent bgColor={"#eceff1"}>
        <ModalHeader>Change Status</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box bgColor={"white"} boxShadow="xl" p={"1rem"}>
            <FormControl>
              <FormLabel fontWeight={"bold"}>New status:</FormLabel>

              <Checkbox
                isChecked={status.statusPurchase === "payment received"}
                id={"payment received"}
                value={status.statusPurchase}
                onChange={handleChange}
                me={'1rem'}
              >
                Payment received
              </Checkbox>
              <Checkbox
                isChecked={status.statusPurchase === "processing order"}
                id={"processing order"}
                value={status.statusPurchase}
                onChange={handleChange}
                me={'1rem'}
              >
                Processing order
              </Checkbox>
              <Checkbox
                isChecked={status.statusPurchase === "order shipped"}
                id={"order shipped"}
                value={status.statusPurchase}
                onChange={handleChange}
                me={'1rem'}
              >
                Order shipped
              </Checkbox>
              <Checkbox
                isChecked={status.status === "order delivered"}
                id={"order delivered"}
                value={status.status}
                onChange={handleChange}
                me={'1rem'}
              >
                Order delivered
              </Checkbox>
              <Checkbox
                isChecked={status.status === "order cancelled"}
                id={"order cancelled"}
                value={status.status}
                onChange={handleChange}
                me={'1rem'}
              >
                Order cancelled
              </Checkbox>
              
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Change
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};

export default StatusForm;
