import React, { useState,useEffect, useRef } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';


function AccountDetail() {

  


  const [loan, setLoan] = useState({});
  let {id} = useParams();

  useEffect(()=>{
    
    Axios.get(config.url.API_URL+`/api/AccountOperations/${id}`,{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
      .then((response)=>{
        var d = response.data;
        var account = {};
        account.id = d.id;
        account.startDate = d.startDate;
        account.dueDate = d.dueDate;
        loan.returnDate=d.returnDate
        loan.onHold = d.book.onHold;
        loan.renewCount = d.renewCount;

        account.userId = d.user.id;
        account.userName = d.user.userName;
        account.userEmail = d.user.email;
        account.userPhoneNumber = d.user.phoneNumber

        loan.bookId = d.book.id;
        loan.title = d.book.title;
        loan.isbn = d.book.isbn;
        loan.publisher = d.book.publisher;
        loan.subject = d.book.subject;
       
        loan.totalCopies= d.book.totalCopies;
        loan.CopiesLoanded = d.book.CopiesLoanded
       
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
        <p>Due Date: {loan.dueDate}</p>
        <p>returnDate:{loan.returnDate}</p>
        <p>renewCount:{loan.renewCount}</p>
        <p>onHold:{loan.onHold}</p>
        <br/>
        <p>User Id: {loan.userId}</p>
        <p>Name: {loan.userName}</p>
        <p>Email:{loan.userEmail}</p>
        <p>Phone Number:{loan.userPhoneNumber}</p><br/>
        <p>Book Id: {loan.bookId}</p>
        <p>Title: {loan.title}</p>
        <p>ISBN:{loan.isbn}</p>
       
        <p>Publisher:{loan.publisher}</p>
        <p>Subject:{loan.subject}</p>
     
        
        
        
        </div>
      </div>
    </div>      
    );
  }
  
  
  export default AccountDetail;