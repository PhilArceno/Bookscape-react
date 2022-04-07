import React from 'react';
import {Link} from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
function AdminDashboard(){
    return (<div>
      <Box m={3} maxW="1600" display="flex" justifyContent={'center'}>
        <Heading text-align={'center'}>Book List</Heading>
      </Box>
        <Box m={3} maxW="1600" display="flex" justifyContent={'center'}> 
         <div>
           <Link to="/admin/user/list">User List</Link><br/>
           <Link to="/admin/book/list">Book List</Link><br/>
           <Link to="/admin/loan/list">Loan List</Link><br/>
           <Link to="/admin/account/list">AccountOperation List</Link><br/>
           <Link to="/admin/request/list">Requests List</Link><br/></div></Box>
           </div> 
           );
           }
export default AdminDashboard;