import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';
import { Box, Heading, Image } from '@chakra-ui/react';
import { config } from '../../helpers/constants';

function LoanDetail() {

  const [loan, setLoan] = useState({});
  let {id} = useParams();

  useEffect(()=>{
    
    Axios.get(config.url.API_URL+`/api/Loans/${id}`,{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
      .then((response)=>{
        var d = response.data;
        var loan = {};
        loan.id = d.id;
        loan.startDate = d.startDate;
        loan.dueDate = d.dueDate;
        loan.userId = d.user.id;
        loan.userName = d.user.userName;
        loan.userEmail = d.user.email;
        loan.userPhoneNumber = d.user.phoneNumber
        loan.bookId = d.book.id;
        loan.title = d.book.title;
        loan.isbn = d.book.isbn;
        loan.publisher = d.book.publisher;
        loan.subject = d.book.subject;
        loan.coverImage = d.book.coverImage;
        loan.totalCopies= d.book.totalCopies;
        loan.CopiesLoanded = d.book.CopiesLoanded
        loan.onHold = d.book.onHold;
        loan.renewCount = d.renewCount;
        setLoan(loan);
      });
     },[]);
  
  return (
    <div className="container">
      <div class="card m-2">
        <div class="card-header">Loan Detail</div>
        <div class="card-body">
        <p>Id: {loan.id}</p>
        <p>Start Date: {loan.startDate}</p>
        <p>Due Date: {loan.dueDate}</p><br/>
        <p>User Id: {loan.userId}</p>
        <p>Name: {loan.userName}</p>
        <p>Email:{loan.userEmail}</p>
        <p>Phone Number:{loan.userPhoneNumber}</p><br/>
        <p>Book Id: {loan.bookId}</p>
        <p>Title: {loan.title}</p>
        <p>ISBN:{loan.isbn}</p>
        <p><Image src={loan.coverImage} maxW="20"/></p>
        <p>Publisher:{loan.publisher}</p>
        <p>Subject:{loan.subject}</p>
        <p>renewCount:{loan.renewCount}</p>
        
        
        
        </div>
      </div>
    </div>      
    );
  }
  
  export default LoanDetail;