import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Stack,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { config } from '../helpers/constants';
import { AuthContext } from '../helpers/contexts/AuthContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  password: Yup.string().min(6).max(24).required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
}).required();

export default function ResetPasswordForm() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const submitBtn = useRef(null);
  const [formSuccess, setFormSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  useEffect(()=>{
    Axios.get(config.url.API_URL+`/api/Users/${authState.id}`,{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
      .then((response)=>{
        console.log(response.data);
        var user = response.data;
        setUser(user);
      });
    },[]);

    const onSubmit = (data) => {
      console.log(data);
      fetch(config.url.API_URL + `/api/Users/${authState.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          password: data.password,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
        },
      }).then((response) => response.text())
      .then((text) => {
        console.log(text);
        navigate("/myprofile");
      });
    }


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Reset password
        </Heading>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Text color="red">{errors.password?.message}</Text>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter a 8-24 length password"
              {...register('password')}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Text color="red">{errors.confirmPassword?.message}</Text>
          <InputGroup>
            <Input
              data-testid="confirmPasswordInput"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter a 8-24 length password"
              {...register('confirmPassword')}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6}>
        <Button
                  type="submit"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Submit
                </Button>
        </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
