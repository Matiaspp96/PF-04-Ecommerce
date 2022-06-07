import {
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const SidebarItem = ({ icon, title, navSize, route }) => {
  const router = useRouter();

  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Button
        leftIcon={icon}
        bgColor={"transparent"}
        color={"white"}
        fontWeight={"light"}
        w={navSize === "small" ? "5vw" : "10vw"}
        justifyContent={navSize === "small" ? "center" : "flex-start"}
        _hover={{ color: "black" }}
        onClick={() => router.push(route)}
      >
        <Text display={navSize === "small" ? "none" : "flex"}>{title}</Text>
      </Button>
    </Flex>
  );
};

export default SidebarItem;
