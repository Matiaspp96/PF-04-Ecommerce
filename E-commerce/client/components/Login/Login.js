import { Button, Center, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import axios from 'axios'
const URL = 'https://localhost:3000/api/auth/login/local/signin'
const Url2= 'http://localhost:3000/api/auth/login/local/signup'


const Login = () => {
const [result, setResult] = useState('')
    const [user,setUser] = useState({
    username: '',
    password: ''
})
const router = useRouter()

    function handleSubmit(e){
        e.preventDefault();
        axios.post(URL, user)
        .then(function(response){
            setResult(response.data) 
        })
        .catch(function(error){
            setResult(error)
      })
      setUser({
        username: '',
        password: ''
    })
      console.log(result)
        
    }
    function handleSubmitLogin(e){
        e.preventDefault();
        axios.post(URL, user)
        .then(function(response){
            setResult(response.data) 
        })
        .catch(function(error){
            setResult(error)
      })
      setUser({
        username: '',
        password: ''
    })
      console.log(result)
        
    }

    function handleGoogleLog(){
        router.push('https://localhost:3000/api/auth/login/google')
    }

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
        console.log(e.target.value)
    }

  return (
    
        <Center>
            <Stack>
            <FormControl >
                <Stack>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input id="username"  onChange={handleChange} name="username" type="text" autoComplete="username" required autoFocus />
                </Stack>
                <Stack>
                    <FormLabel htmlFor="current-password">Password</FormLabel>
                    <Input onChange={handleChange} id="current-password" name="password" type="password" autoComplete="current-password" required />
                </Stack>
                <Button onClick={e=>{handleSubmit(e)}}>Sign in</Button>
                <Button onClick={e=>{handleSubmitLogin(e)}}>Log in</Button>
            </FormControl>
            <Button onClick={handleGoogleLog}>Log in with google</Button>
        
    </Stack>
    </Center>
    
  )
}

export default Login
