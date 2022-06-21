import Swal from "sweetalert2";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Flex,
  Text,
  Image,
  Heading,
  InputGroup,
  InputRightElement,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  SlideFade,
  useColorMode,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/actions/user";
import Link from "next/link";
import { signInValidations } from "../../utils/authValidations";
import { BASEURL } from '../../redux/actions/products'

const Login = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [result, setResult] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setErrors(signInValidations(user));
  }, [user]);
  const { colorMode } = useColorMode();

  async function logIn(e) {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let getUser = await axios.post(
        `${BASEURL}/auth/login`,
        user,
        config
      );
      dispatch(getUserData(getUser.data.user));
      let localInfo = {
        token : getUser.data.token,
        _id :getUser.data.user._id,
        role: getUser.data.user.role,
        email:getUser.data.user.email,
        name:getUser.data.user.name
      };
      localStorage.setItem("userInfo", JSON.stringify(localInfo));
      setUser({
        email: "",
        password: "",
      });
      if (getUser.status === 200) {
        return router.push("/");
      }
    } catch (error) {
      
      if (error.response.data.error === "USER_NOT_EXISTS") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User do not exist",
        });
      }
      if (error.response.data.error === "PASSWORD_INVALID") {
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Wrong password",
        });
      }

      //añadir otro if error 500

      setUser({
        email: "",
        password: "",
      });
    }
  }

  function handleGoogleLog() {
    router.push(`${BASEURL}/auth/login/google`);
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  return (
    <SlideFade key={router.route} in="true">
<Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      bgColor={"#eceff1"}
    >

      {/* <Image
        pos='absolute'
          alt={"Login Image"}
          objectFit={"contain"}
          w={"40vw"}
          src={"/Dog.jpg"}
          zIndex='0'
        /> */}
      <Flex 
      bgImage={`url(/Dog.jpg)`}
      bgPos='-75px 0px'
      p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} >
        <Breadcrumb color={colorMode === 'light' ? 'whiteAlpha.900' : 'blackAlpha.900'}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/login">Login</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
          <Stack bgColor={colorMode === 'light' ? 'whiteAlpha.900' : 'blackAlpha.500'} align={"center"} >
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Log in
            </Heading>
            <Text fontSize={"lg"} color={colorMode === 'light' ? "gray.600" : 'whiteAlpha.900'}>
              and make your pets happy 😻
            </Text>
          </Stack>

          <Box boxShadow='5px 10px 8px #888888' rounded={"lg"} bg={colorMode === 'light' ? 'white' : 'black'}  p={8}>
            <Stack spacing={4}>
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

              <Link href={"/forgotPassword"}>
                <Text textAlign={"right"} color={"#1884BE"}>
                  Forgot password?
                </Text>
              </Link>

              <Stack spacing={10} pt={2}>
                <Button
                  boxShadow={colorMode === 'light' ? '5px 10px 8px #888888' : 'none'}
                  size="lg"
                  colorScheme={"blue"}
                  variant={"solid"}
                  onClick={(e) => {
                    logIn(e);
                  }}
                  isDisabled={Object.keys(errors).length === 0 ? false : true}
                >
                  Log in
                </Button>

                <Button
                  boxShadow={colorMode === 'light' ? '5px 10px 8px #888888' : 'none'}
                  colorScheme={"blue"}
                  variant={"outline"}
                  onClick={handleGoogleLog}
                >
                  Log in with google
                </Button>
              </Stack>

              <Flex pt={6} justifyContent={"center"}>
                <Text align={"center"} me={".5rem"}>
                  Not an user
                </Text>
                <Link href={"/register"}>
                  <Text color={"#1884BE"}>Register Now</Text>
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
};

export default Login;
