import { Box, Button, Heading } from '@chakra-ui/react';
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

function UserLoans() {
  const [error, setError] = useState('');
  const [loanList, setLoanList] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [renewStatus, setRenewStatus] = useState(false);

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
        } else return response.text();
      })
      .then(text => {
        let parsed = JSON.parse(text);
        console.log(parsed);
        if (parsed) setRenewStatus(true);
      })
      .catch(err => {
        console.log(err.message);
        setRenewStatus(false);
      });
  };

  return (
    <>
      <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
        <Heading text-align={'center'}>My borrowed books</Heading>
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
            </Tr>
          </Thead>
          <Tbody>
            {loanList.length > 0
              ? loanList.map(loan => {
                  return (
                    <Tr key={loan.id}>
                      <Td>{loan.book.title}</Td>
                      <Td>{loan.book.author}</Td>
                      <Td>{loan.startDate}</Td>
                      <Td>{loan.dueDate}</Td>

                      <Button
                        colorScheme="teal"
                        size="md"
                        onClick={() => {
                          renewLoan(loan.id);
                        }}
                      >
                        Renew book
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
export default UserLoans;
