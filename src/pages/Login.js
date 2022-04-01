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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { config } from '../helpers/constants';
import { useNavigate } from 'react-router-dom';

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(24).required(),
  })
  .required();

export default function Login({checkLoggedIn}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    setIsLoading(true);
    fetch(config.url.API_URL + '/api/Users/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.text())
      .then(text => {
        let parsed = JSON.parse(text);
        console.log(parsed);
        localStorage.setItem("accessToken", parsed.token);
        checkLoggedIn();
        setIsLoading(false);
        navigate('/');
      });
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Text data-testid="emailErrorMessage" color="red">{errors.email?.message}</Text>
                <Input data-testid="email"
                  placeholder="Ex. JohnDoe@email.com"
                  type="email"
                  {...register('email')}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Text color="red">{errors.password?.message}</Text>
                <Input data-testid="password"
                  type="password"
                  placeholder="Enter a 8-24 length password"
                  {...register('password')}
                />
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
                <Button id="loginbtn" data-testid="login"
                  isLoading={isLoading}
                  type="submit"
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
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
