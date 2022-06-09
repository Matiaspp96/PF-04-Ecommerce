import { Text, Stack, Button, Flex, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";

const notAllow = () => {
    const router = useRouter();
  return (
    <Center h={'100vh'}>
        <Stack justifyItems={'center'}>
          <Text textAlign={'center'}>Access denied. You are not an Admin</Text>
          <Text textAlign={"center"}>
            Think this is an error? Contact Support
          </Text>
          <Button
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Button>
        </Stack>
    </Center>
  )
}

export default notAllow