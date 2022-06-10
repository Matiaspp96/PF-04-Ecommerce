import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  Flex,
  SlideFade,
  Box,
  Image,
  Heading,
  Input,
  Stack,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { resetValidations } from "../../utils/authValidations";
import { BASEURL } from '../../redux/actions/products'

const Reset = () => {
  const router = useRouter();
  const [errors,setErrors] = useState({})
  const [email, setEmail] = useState({ email: "" });
  const [result, setResult] = useState({});

  useEffect(()=>{
    setErrors(resetValidations(email))
  },[email])

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASEURL}/auth/olvide-password`,
        email
      );
      setResult(response.data.msg);
        Swal.fire({
          icon: "success",
          title: "Check your inbox",
          text: "We have sent you an email with instructions",
        });
      
      router.push('/login')
      
    } catch (error) {
      setResult(error);
    }
  };

  const handleChange = (e) => {
    setEmail({ ...email, email: e.target.value });
  };

  return (
    <SlideFade key={router.route} in="true">
      <Stack
        minH={"100vh"}
        direction={{ base: "column", md: "row-reverse" }}
        bgColor={"#eceff1"}
      >
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"}>
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/login">Login</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="/forgotPassword">Reset</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Forgot your password?
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                You&apos;ll get an email with a reset link 💌
              </Text>
            </Stack>

            <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
              <FormControl id="email">
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  value={email.email}
                  onChange={handleChange}
                />
              </FormControl>
              {errors.email && <Text color={'red'}>{errors.email}</Text>}
              <Stack spacing={6}>
                <Button
                  mt={"1rem"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSubmit}
                  isDisabled={Object.keys(errors).length === 0 ? false : true}
                >
                  Request Reset
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
        <Flex
          justifyContent={"center"}
          bgColor={"#1884BE"}
          boxShadow="xl"
          p={"2rem"}
        >
          <Image
            alt={"Login Image"}
            objectFit={"contain"}
            w={"40vw"}
            src={"/Logo.png"}
          />
        </Flex>
      </Stack>
    </SlideFade>
  );
};

export default Reset;
