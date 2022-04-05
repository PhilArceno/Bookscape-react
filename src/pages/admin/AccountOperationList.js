import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { Box, Heading, Image } from '@chakra-ui/react';
import Axios from 'axios';
import { config } from '../../helpers/constants';

function AccountOperationList() {
  let { id } = useParams();
  const [error, setError] = useState('');
  const [accountList,setAccountList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    
    Axios.get(config.url.API_URL+"/api/AccountOperations",{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    }) .then((response)=>{
      var data = response.data;
      var accountList = []; 
      data.forEach(d => {
        var account = {};
        account.id = d.id;
        account.operationType = d.operationType.operationType;
        account.startDate= d.loan.startDate;
        account.dueDate = d.loan.dueDate;
        account.userId = d.user.id;
        account.userName = d.user.userName;
        account.bookId = d.book.id;
        account.title = d.book.title;
        account.isbn = d. book.isbn;
        account.coverImage = d.book.coverImage
        account.amount = d.amount
        account.recordeTime = d.recordeTime;
        accountList.push(account);
      })
      setAccountList(accountList);
    }).catch((error)=>{
      setError(error.message);
    });
    
     },[]);

  const editAccount = (id)=>{
      navigate("/admin/account/edit/"+id);
    };
   
  const deleteAccount = (id)=>{
   
    Axios.delete(config.url.API_URL+`/api/AccountOperations/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
  }).then((response) => {
          navigate('/admin/account/list');
    }).catch((error)=>{
      setError(error.message);
    }); 
    window.location.reload();
  }
    
  return (
    <div class ="container">
       {error?(<div className="alert alert-danger">{error}</div>):""}
		<br/>
        
         <div class = "row">
			<div class = "col-lg-3">
         <a class = "btn btn-primary btn-sm mb-3" href="/admin/account/add">Add New Account</a><br/></div>
		</div>
         <table class = "table table-striped table-bordered">
           <thead class = "table-dark">
        <tr>
        <th>CoverImage</th>
        <th>Title</th>
        <th>Book ISBN</th>
        <th>UserName</th>
        <th>StartDate</th>
        <th>DueDate</th>
        <th>Amount</th>
        <th>Recorder Time</th>
        
        <th>Update</th>
        <th>Delete</th>

        </tr>
           </thead>
           <tbody>
        {accountList.length > 0 ? accountList.map((account)=>{
          return (<tr key={(account.id)}>
            <td><Image src={account.coverImage} maxW="20"/></td>
            <td><a href={'/admin/account/'+account.id}>{account.operationType}</a></td>
            <th>{account.isbn}</th>
            <td>{account.userName}</td>
            <td>{account.startDate}</td>
            <td>{account.dueDate}</td> 
            <th>{account.amount}</th>   
            <th>{account.recordeTime }</th> 
             
            <td><button class = "btn btn-primary" onClick={()=>{editAccount(account.id)}}>Update</button></td>
            <td><button class = "btn btn-danger" onClick={()=>{deleteAccount(account.id)}}>Delete</button></td>    
          </tr>)
        })
        :
        ""
      }
        </tbody>
        </table>
      </div>
    
    );
  }
  
  export default AccountOperationList;