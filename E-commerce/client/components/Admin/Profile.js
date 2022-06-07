import { Avatar, Text, Stack } from "@chakra-ui/react";

const Profile = ({ user }) => {
  return (
    <Stack alignItems={"center"}>
      <Avatar size="lg" name={user.name} src="" />
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </Stack>
  );
};

export default Profile;
