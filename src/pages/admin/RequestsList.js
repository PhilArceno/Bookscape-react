import { Box, Button, Heading } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { config } from '../../helpers/constants';

function RequestList() {
  const [message, setMessage] = useState('');
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    Axios.get(config.url.API_URL + '/api/request', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then(response => {
      setRequestList(response.data);
    });
  }, []);

  const cancelRequest = id => {
    Axios.delete(config.url.API_URL + `/api/request/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).catch(err => {
      setMessage(err.message);
    });
    window.location.reload();
  };

  return (
    <>
      <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
        <Heading text-align={'center'}>Requested books</Heading>
      </Box>
      <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
      <Text fontSize='4xl' color='tomato' >{message}</Text>
      </Box>
      <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
        <Table>
          <Thead>
            {' '}
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Request Day</Th>
              <Th>Cancel Request</Th>
            </Tr>
          </Thead>
          <Tbody>
            {requestList.length > 0
              ? requestList.map(request => {
                  return (
                    <Tr key={request.id}>
                      <Td>{request.book.title}</Td>
                      <Td>{request.book.author}</Td>
                      <Td>{request.requestDate.substring(0, 10)}</Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          size="md"
                          onClick={() => {
                            cancelRequest(request.id);
                          }}
                        >
                          Cancel request
                        </Button>
                      </Td>
                    </Tr>
                  );
                })
              : ''}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
export default RequestList;
