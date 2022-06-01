import { Center, Text, Stack, Button } from "@chakra-ui/react";
import Perfil from "../../components/Admin/Perfil";
import { useSelector } from "react-redux";
import { useRouter } from 'next/router'

const Dashboard = ()=>{
    const user = useSelector((state)=> state.userReducer.user);
    const router = useRouter()

    return (
        
        <Center>
            {user._id ?
            <Stack>
                {console.log(user)}
            <Text>
                Hola desde el dashboard {user.name}
            </Text>
            <Text textAlign={'center'}>¡Eres admin!</Text>
            <Center>
                <Perfil user={user} />
            </Center>
            <Button onClick={()=>{router.push('/')}}>Home</Button>  
        </Stack> :
        <Stack>
            <Text>
                Access denied. You are not an Admin
            </Text>
            <Text textAlign={'center'}>Think this is an error? Contact Support</Text>
            <Button onClick={()=>{router.push('/')}}>Home</Button>  
        </Stack>
        }
            
        </Center>
    )
}

export default Dashboard