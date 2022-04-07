import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  useColorModeValue,
  InputGroup,
  HStack,
  InputRightElement,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { config } from '../helpers/constants';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as validate from "../helpers/yupValidators";

const schema = yup
  .object({
    username: validate.username,
    email: validate.email,
    phoneNumber: validate.phoneNumber,
    password: validate.password,
    confirmPassword: validate.confirmPassword
  })
  .required();

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const submitBtn = useRef(null);
  const [formSuccess, setFormSuccess] = useState(false);
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
    fetch(config.url.API_URL + '/api/Users', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        userName: data.username
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.text())
    .then((text) => {
      let parsed = JSON.parse(text);
      console.log(parsed);
      if (parsed.id) {
        //fix: success property?
        setIsLoading(false);
        setFormSuccess(true);
        submitBtn.current.innerText = "Sign up Successful"
      }
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w="sm"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl data-testid="username" id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Text data-testid="username-errormessage" color="red">{errors.username?.message}</Text>
                <Input data-testid="usernameInput"
                  placeholder="Ex. JohnDoe12"
                  type="text"
                  {...register('username')}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Text data-testid="email-errormessage" color="red">{errors.email?.message}</Text>
                <Input
                  placeholder="Ex. JohnDoe@email.com"
                  type="email"
                  {...register('email')}
                />
              </FormControl>
              <FormControl id="phoneNumber" isRequired>
                <FormLabel>Phone #</FormLabel>
                <Text color="red">{errors.phoneNumber?.message}</Text>
                <Input
                  placeholder="Ex. 514-123-4567"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  {...register('phoneNumber')}
                  isRequired
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Text color="red">{errors.password?.message}</Text>
                <InputGroup>
                  <Input data-testid="passwordInput"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter a 6-24 length password"
                    {...register('password')}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
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
                  <Input data-testid="confirmPasswordInput"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter a 6-24 length password"
                    {...register('confirmPassword')}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button data-testid="signUpbtn"
                  ref={submitBtn}
                  isDisabled={formSuccess}
                  type="submit"
                  isLoading={isLoading}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
