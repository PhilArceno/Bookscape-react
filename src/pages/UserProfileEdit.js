import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Text,
  Center,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { config } from '../helpers/constants';
import { AuthContext } from '../helpers/contexts/AuthContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function UserProfileEdit() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const CancelEdit = () => {
    navigate('/myprofile');
  };

  const NotImplemented = () => {
    alert("Hello! I am not implemented!!");
  };

  useEffect(()=>{
  Axios.get(config.url.API_URL+`/api/Users/${authState.id}`,{
    headers : {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
    }
  })
    .then((response)=>{
      console.log(response.data);
      var user = response.data;
      const fields = ['userName', 'email', 'phoneNumber'];
      fields.forEach(field => setValue(field, user[field]));
      setUser(user);
    });
  },[]);

  const onSubmitHandler = data => {
    console.log(data);
    fetch(config.url.API_URL + `/api/Users/${authState.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        UserName: data.userName,
        Email: data.email,
        PhoneNumber: data.phoneNumber
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
    })
      .then(async response => {
        if (!response.ok) {
          throw Error(await response.text());
        } else response.text();
      })
      .then(text => {
        navigate("/myprofile");
      })
      .catch(error => {
        alert(error.message);
      });
  };
  

  const validationSchema = Yup.object().shape({
    userName: Yup.string().min(4).max(24).trim().required('UserName is required'),
    email: Yup.string().email().trim()
      .required('Email is Required'),
    phoneNumber: Yup.string().trim().matches(phoneRegExp, "Please use the correct format.")
      .required('PhoneNumber is required')
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
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
          Update My Profile Details
        </Heading>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input name="Id" type="hidden" value={user.id}/>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
          
            <Center>
              <Avatar
                size="xl"
                src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
              >
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                  onClick={()=>{NotImplemented()}}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" onClick={()=>{NotImplemented()}}>Change Profile Picture</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>Username</FormLabel>
          <Text color="red">{errors.userName?.message}</Text>
          <Input
          name="userName"
            placeholder="Your Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            {...register('userName')}
          className={`form-control m-1  ${errors.userName ? 'is-invalid' : ''}`}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Text color="red">{errors.email?.message}</Text>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            {...register('email')}
          className={`form-control m-1 ${errors.email ? 'is-invalid' : ''}`}
          />
        </FormControl>
        <FormControl id="phoneNumber" isRequired>
          <FormLabel>Phone # (Ex. 514-123-4567)</FormLabel>
          <Text color="red">{errors.phoneNumber?.message}</Text>
          <Input
            placeholder="Ex. 514-123-4567"
            _placeholder={{ color: 'gray.500' }}
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            {...register('phoneNumber')}
            className={`form-control m-1 ${errors.phoneNumber ? 'is-invalid' : ''}`}
          />
        </FormControl>
        <br />
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={()=>{CancelEdit()}}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
