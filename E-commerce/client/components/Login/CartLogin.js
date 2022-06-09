import { Button, Center, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'
import { BASEURL } from '../../redux/actions/products'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/actions/user'
 
const urlSignIn = `${BASEURL}/auth/cart/login`;

const Login = () => {

const dispatch = useDispatch();
const [result, setResult] = useState('')
    const [user,setUser] = useState({
    username: '',
    password: ''
})
const router = useRouter()

   async function handleSubmit(e){
        e.preventDefault();
       
        const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
       
        let getUser = await axios.post(urlSignIn,user,config);
        dispatch(getUserData(getUser.data.user));
        let localInfo = {
            token : getUser.data.token,
            _id :getUser.data.user._id,
            role : getUser.data.user.role
        }
        localStorage.setItem(
            'userInfo',
            JSON.stringify(localInfo)
          );   
         setUser({
         username: '',
         password: ''
        })
        if(getUser.status ===200){
            return router.push('/');
        }  
    };
    function handleSubmitLogin(e){
        //OJO HAY QUE ACOMODAR
        e.preventDefault();
        axios.post(URL, user)
        .then(function(response){
            setResult(response.data) 
        })
        .catch(function(error){
            setResult(error)
      });
      setUser({
        username: '',
        password: ''
    });
    };

    function handleGoogleLog(){
        router.push(`${BASEURL}/auth/cart/login/google`)
    };

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
        
    };
    
  return (
    
        <Center>
            <Stack>
            <FormControl >
                    <Stack>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input id="username"  onChange={handleChange} name="email" type="text" autoComplete="username" required autoFocus />
                    </Stack>
                    <Stack>
                        <FormLabel htmlFor="current-password">Password</FormLabel>
                        <Input onChange={handleChange} id="current-password" name="password" type="password" autoComplete="current-password" required />
                    </Stack>
                    <Button onClick={e=>{handleSubmit(e)}}>Sign in</Button>
                    <Button onClick={e=>{handleSubmitLogin(e)}}>Log in</Button>
                </FormControl>
                <Button pos='relative' top='10rem' onClick={handleGoogleLog}>Log in with google</Button>  
            </Stack>
    </Center>
    
  )
}

export default Login

