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
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { config } from '../helpers/constants';

function UserLoans() {
  const [error, setError] = useState('');
  const [loanList, setLoanList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('https://localhost:7098/api/Loans').then(response => {
      setLoanList(response.data);
    });
  }, [loanList]);

  const editLoan = id => {
    navigate('/loans/edit/' + id);
  };

  const deleteLoan = id => {
    // Simple DELETE request with fetch
    fetch(config.url.API_URL + `/api/Loans/` + id, {
      method: 'DELETE',
    }).then(() => this.setState({ status: 'Delete successful' }));
  };

  return (
    <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
      <Table>
        <Thead>
          {' '}
          <Tr>
            <Th>Id</Th>
            <Th>Start Day</Th>
            <Th>Due Day</Th>
            <Th>Return Day</Th>
            <Th>Book Id</Th>
            <Th>User Id</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loanList.length > 0
            ? loanList.map(loan => {
                return (
                  <Tr key={loan.id}>
                    <Td>{loan.id}</Td>
                    <Td>{loan.startDate}</Td>
                    <Td>{loan.dueDate}</Td>
                    <Td>{loan.returnDate}</Td>
                    <Td>{loan.id.book}</Td>
                    <Td>{loan.id.user}</Td>

                    <Button
                      colorScheme="teal"
                      size="md"
                      onClick={() => {
                        editLoan(loan.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={() => {
                        deleteLoan(loan.id);
                      }}
                    >
                      Delete
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