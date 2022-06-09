import { Text, Stack, Button, Flex, Center } from "@chakra-ui/react";
import Link from "next/link";

const notAllow = () => {
  return (
    <Center h={'100vh'}>
        <Stack justifyItems={'center'}>
          <Text textAlign={'center'}>Access denied. You are not an Admin</Text>
          <Text textAlign={"center"}>
            Think this is an error? Contact Support
          </Text>

          <Center>
          <Link href={'/'}
          >
            <Text color={'blue'} cursor={'pointer'}>Home</Text>
          </Link>
          </Center>

          

        </Stack>
    </Center>
  )
}

export default notAllow