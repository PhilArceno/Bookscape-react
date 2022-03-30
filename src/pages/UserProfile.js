import {
  Button,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Avatar,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../helpers/constants';
import { AuthContext } from '../helpers/AuthContext';

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const { authState } = useContext(AuthContext);

  console.log (authState.id);

  useEffect(() => {
    Axios.get(config.url.API_URL + `/api/Users/${authState.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then(response => {
      console.log(response.data);
      var user = response.data;
      const fields = ['userName', 'email', 'phoneNumber'];
      fields.forEach(field => setValue(field, user[field]));
      setUser(user);
    });
  }, []);

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('UserName is required'),
    email: Yup.string().required('Email is Required'),
    phoneNumber: Yup.string().required('PhoneNumber is required'),
  });

  const {
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          My Profile
        </Heading>
        <Stack direction={['column', 'row']} spacing={6}>
          <Center>
            <Avatar
              size="xl"
              src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            ></Avatar>
          </Center>
        </Stack>
        <Text color={'gray.500'}>Name</Text>
        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
          {user.userName}
        </Heading>

        <Text color={'gray.500'}>Email address</Text>
        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
          {user.email}
        </Heading>

        <Text color={'gray.500'}>Phone #</Text>
        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
          {user.phoneNumber}
        </Heading>

        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'green.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
          >
            Borrowed Books
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
          >
            Update Profile Info
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
