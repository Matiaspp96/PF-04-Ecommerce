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
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { validatePassword } from "../../utils/authValidations"; 
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { BASEURL } from '../../redux/actions/products'

const Token = () => {
  const router = useRouter();
  const { token } = router.query;
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState({ password: "" });
  const [result, setResult] = useState({});

  useEffect(() => {
    setErrors(validatePassword(password));
  }, [password]);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${BASEURL}/auth/olvide-password/${token}`,
        password
      );
      setResult(response.data.msg);
      Swal.fire({
        icon: "success",
        title: "Password modified successfully",
        text: "Happy shopping!",
      });

      router.push("/login");
    } catch (error) {
      setResult(error);
    }
  };

  const handleChange = (e) => {
    setPassword({ ...password, password: e.target.value });
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
                <BreadcrumbLink href="/token">Reset</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Stack align={"center"}>
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Enter new password
              </Heading>
            </Stack>

            <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password.password}
                    onChange={handleChange}
                    minLength={8}
                    maxLength={15}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {errors.password && <Text color={"red"}>{errors.password}</Text>}

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
                  Reset Password
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

export default Token;
