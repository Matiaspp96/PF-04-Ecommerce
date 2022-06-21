import { Stack, Text,Heading } from "@chakra-ui/react"

const CardDashboard = ({title,data, color}) => {
  return (
    <>
        <Stack bgColor={color} m={'1rem'} p={'1rem'} borderRadius={5}>
            <Heading color={'white'}>{title}</Heading>
            <Text fontSize={'2rem'} color={'white'}>{data}</Text>
        </Stack>
        
    </>
  )
}

export default CardDashboard