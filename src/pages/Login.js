import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

//NOTES Code from last project
//     import React, { useState, useContext } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../helpers/AuthContext";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAuthState } = useContext(AuthContext);

//   let navigate = useNavigate();

//   const login = () => {
//     const data = { username: username, password: password };
//     axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data).then((response) => {
//       if (response.data.error) {
//         alert(response.data.error);
//       } else {
//         localStorage.setItem("accessToken", response.data.token);
//         setAuthState({
//           username: response.data.username,
//           id: response.data.id,
//           status: true,
//         });
//         navigate("/");
//       }
//     });
//   };

export default function Login() {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
