import { Box, Button, Heading} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { config } from '../helpers/constants';
import { AuthContext } from '../helpers/contexts/';

function RequestList() {
  const [error, setError] = useState('');
  const [requestList, setRequestList] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [renewStatus, setRenewStatus] = useState(false);


  useEffect(() => {
    Axios.get(config.url.API_URL + "/api/request",{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    }).then(response => {
      setRequestList(response.data);
    });
  }, [requestList]);

  const cancelRequest = (id) => {   
        Axios.delete(config.url.API_URL+`/api/request/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
          }
      }).catch((error)=>{
          setError(error.message);
        });
       window.location.reload();
      }


  return (
    <><Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
    <Heading text-align={'center'}>My requested books</Heading>
    </Box>
    <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>

      <Table>
        <Thead>
          {' '}
          <Tr>
          <Th>Title</Th>
          <Th>Author</Th>
            <Th>Request Day</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requestList.length > 0
            ? requestList.map(request => {
                return (
                  <Tr key={request.id}>
                    <Td>{request.book.title}</Td>
                    <Td>{request.book.author}</Td>
                    <Td>{request.requestDate}</Td>

                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={() => {
                        cancelRequest(request.id);
                      }}
                    >
                      Cancel request
                    </Button>
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