import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Heading,
  Stack,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { Html5QRcodeReader } from './';
import { LoanContext } from '../helpers/contexts/LoanContext';

const Scanner = ({ title, action, result }) => {
  const { codes, dispatchLoanEvent } = useContext(LoanContext);

  const onSubmit = e => {
    e.preventDefault();
    action();
  };

  const clearValues = e => {
    e.preventDefault();
    dispatchLoanEvent("CLEAR_VALUES", {});
  }

  return (
    <Box>
      <Stack
        bg={'gray.50'}
        m="50px auto"
        rounded={'xl'}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: '2xl' }}
      >
        <Stack spacing={4}>
          <Heading
            color={'gray.800'}
            lineHeight={1.1}
            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          >
            {title} a book
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              !
            </Text>
          </Heading>
          <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
            {title} a book using the scanner, or enter the details into the
            form.
            <br />
            <em>Scan the book first, then the User's Card</em>
          </Text>
        </Stack>
        {!codes.isbn ? (
          <Html5QRcodeReader fps={10} qrbox={400} disableFlip={false} />
        ) : (
          ''
        )}
        {!codes.returnee && codes.isbn ? (
          <Html5QRcodeReader fps={10} qrbox={400} disableFlip={false} />
        ) : (
          ''
        )}
        <Box as={'form'} mt={10} onSubmit={e => onSubmit(e)}>
          <Stack spacing={4}>
          <Text color={result.color}>{result.message}</Text>
            <FormControl>
              <FormLabel>ISBN</FormLabel>
              <Text color="red"></Text>
              <Input
                placeholder="ISBN goes here..."
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                value={codes.isbn}
                onChange={e =>
                  dispatchLoanEvent('SET_ISBN', { isbn: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>User Id</FormLabel>
              <Text color="red"></Text>
              <Input
                placeholder="User Id goes here..."
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                value={codes.returnee}
                onChange={e =>
                  dispatchLoanEvent('SET_RETURNEE', {
                    returnee: e.target.value,
                  })
                }
              />
            </FormControl>
          </Stack>
            <Button
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              color={'white'}
              bg={'gray.400'}
              _hover={{
                boxShadow: 'xl',
              }}
              onClick={(e) => {clearValues(e)}}
            >
              Clear
            </Button>
          <Button
            type="submit"
            fontFamily={'heading'}
            mt={8}
            w={'full'}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={'white'}
            _hover={{
              bgGradient: 'linear(to-r, red.400,pink.400)',
              boxShadow: 'xl',
            }}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Scanner;
