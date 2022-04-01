import { Box, Button} from '@chakra-ui/react';
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
import { AuthContext } from '../helpers/AuthContext';

function UserLoans() {
  const [error, setError] = useState('');
  const [loanList, setLoanList] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    Axios.get(config.url.API_URL + "/api/loans").then(response => {
      setLoanList(response.data);
    });
  }, [loanList]);

  const renewLoan = (id) => {
    Axios.put(config.url.API_URL+`/api/Loans/renew/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
  });
  }


  return (
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
  );
}
export default UserLoans;