import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  List,
  Stack,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { MdSettings } from 'react-icons/md';
function AdminDashboard() {
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
        <Box m={3} maxW="1600" display="flex" justifyContent={'center'}>
          <Heading text-align={'center'}>Admin Dashboard</Heading>
        </Box>
        <Box m={3} maxW="1600" display="flex" justifyContent={'center'}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={MdSettings} color="green.500" />
              <Link to="/admin/user/list">Users</Link>
            </ListItem>
            <ListItem>
              <ListIcon as={MdSettings} color="green.500" />
              <Link to="/admin/book/list">Books</Link>
            </ListItem>
            <ListItem>
              <ListIcon as={MdSettings} color="green.500" />
              <Link to="/admin/loan/list">Loans</Link>
            </ListItem>
            <ListItem>
              <ListIcon as={MdSettings} color="green.500" />
              <Link to="/admin/account/list">Account Operations</Link>
            </ListItem>
            <ListItem>
              <ListIcon as={MdSettings} color="green.500" />
              <Link to="/admin/request/list">Requests</Link>
            </ListItem>
          </List>
        </Box>
      </Stack>
    </Flex>
  );
}
export default AdminDashboard;
