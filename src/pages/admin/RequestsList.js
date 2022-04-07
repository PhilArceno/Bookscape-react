import { Box, Button, Heading } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { config } from '../../helpers/constants';

function RequestList() {
  const [message, setMessage] = useState('');
  const [requestList, setRequestList] = useState([]);
  const [error, setError] = useState('');
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
    <div class ="container">
      {error?(<div className="alert alert-danger">{error}</div>):""}
		<br/>
      <Box m={10} maxW="1600" display="flex" justifyContent={'center'}>
        <Heading text-align={'center'}>Requested books</Heading>
      </Box>
    <div class = "row">
 <div class = "col-lg-3">
    
</div>
    <table class = "table table-striped table-bordered">
      <thead class = "table-dark">

   <tr>
   <th>Request Day</th>
   <th>User</th>
     <th>Title</th>
   <th>Author</th>
  
  
   <th>Cancel Request</th>
   </tr>
      </thead>
      <tbody>
   {requestList.length > 0 ? requestList.map((request)=>{
     return (<tr key={(request.id)} >
       <td>{request.requestDate.substring(0, 10)}</td>
       <td>{request.user.userName}</td>
       <td>{request.book.title}</td>
       <td>{request.book.author}</td>
       
       
      
       <td><button  class = "btn btn-danger" onClick={()=>{cancelRequest(request.id)}}>Cancel Request</button></td>
       
     </tr>)
   })
   :
   ""
 }
   </tbody>
   </table>
 </div>
</div>
)
}

export default RequestList;
