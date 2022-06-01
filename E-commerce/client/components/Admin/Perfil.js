import { Avatar, Text, Stack } from "@chakra-ui/react"

const Perfil = ({ user }) => {
  return (
    <Stack alignItems={'center'}>
        <Avatar size='lg' name={user.name} src='' />
        <Text>{user.email}</Text>
    </Stack>
  )
}

export default Perfil