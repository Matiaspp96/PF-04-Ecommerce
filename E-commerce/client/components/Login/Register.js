import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Image,
    Text,
    SlideFade,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import Link from "next/link";
  import { useRouter } from "next/router";
  import axios from "axios";
  import { registerValidations } from "../../utils/authValidations";
  import { BASEURL } from '../../redux/actions/products'
  
  export default function Register() {
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [result, setResult] = useState("");
    const [user, setUser] = useState({
      name: "",
      email: "",
      password: "",
    });
  
    useEffect(() => {
      setErrors(registerValidations(user));
    }, [user]);
  
    function register(e) {
      e.preventDefault();
      axios
        .post(`${BASEURL}/auth/register`, user)
        .then(function (response) {
          setResult(response.data);
        })
        .catch(function (error) {
          setResult(error);
        });
      setUser({
        name: "",
        email: "",
        password: "",
      });
      router.push("/login");
    }
  
    function handleChange(e) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  
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
  
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="/register">Register</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Sign up
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to enjoy all of our cool features 😎
                </Text>
              </Stack>
  
              <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                  {errors.name && <Text color={"red"}>{errors.name}</Text>}
  
                  <FormControl isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </FormControl>
                  {errors.email && <Text color={"red"}>{errors.email}</Text>}
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={user.password}
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
                  {errors.password && (
                    <Text color={"red"}>{errors.password}</Text>
                  )}
  
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      onClick={(e) => {
                        register(e);
                      }}
                      _hover={{
                        bg: "blue.500",
                      }}
                      isDisabled={Object.keys(errors).length === 0 ? false : true}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Flex pt={6} justifyContent={"center"}>
                    <Text align={"center"} me={".5rem"}>
                      Already a user?
                    </Text>
                    <Link href={"/login"}>
                      <Text color={"#1884BE"}>Login</Text>
                    </Link>
                  </Flex>
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
  }
  