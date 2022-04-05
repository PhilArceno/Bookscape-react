import React from 'react';
import {Link} from 'react-router-dom';
import { Box } from '@chakra-ui/react'

function AdminDashboard(){
    return (
        <Box margin={10} >
          <h1>AdminDashboard</h1>
           <Link to="/admin/user/list">User List</Link><br/>
           <Link to="/admin/book/list">Book List</Link><br/>
           <Link to="/admin/loan/list">Loan List</Link><br/>
           <Link to="/admin/account/list">AccountOperation List</Link><br/>
           <Link to="/admin/request/list">Requests List</Link><br/>
           </Box>);
           }
export default AdminDashboard;