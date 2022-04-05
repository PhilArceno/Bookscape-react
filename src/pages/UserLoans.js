import { Box, Button, Heading } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Text,
  Image,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { config } from '../helpers/constants';
import { AuthContext } from '../helpers/contexts/';

function UserLoans() {
  const [message, setMessage] = useState('');
  const [loanList, setLoanList] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [renewStatus, setRenewStatus] = useState(false);
  const submitBtn = useRef(null);

  useEffect(() => {
    Axios.get(config.url.API_URL + '/api/loans/active', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then(response => {
      setLoanList(response.data);
    });
  }, []);

  const renewLoan = id => {
    fetch(config.url.API_URL + `/api/loans/renew/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then(async response => {
        if (!response.ok) {
          throw Error(await response.text());
        } else {
          setMessage('Loan has been successfully renewed');
          setTimeout(() => {
            setMessage(null)
          }, 1000)
        };
      })
      .catch(err => {
        setMessage(err.message);
        setTimeout(() => {
          setMessage(null)
        }, 1000)
      });
  };

  return (
    <>
      <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
        <Heading text-align={'center'}>My borrowed books</Heading>
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
              <Th>Start Day</Th>
              <Th>Due Day</Th>
              <Th>Renew</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loanList.length > 0
              ? loanList.map(loan => {
                  return (
                    <Tr key={loan.id}>
                      <Td>{loan.book.title}</Td>
                      <Td>{loan.book.author}</Td>
                      <Td>{loan.startDate.substring(0, 10)}</Td>
                      <Td>{loan.dueDate.substring(0, 10)}</Td>
                      <Td>
                        <Button
                          ref={submitBtn}
                          colorScheme="teal"
                          size="md"
                          onClick={() => {
                            renewLoan(loan.id);
                          }}
                        >
                          Renew book
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
export default UserLoans;
