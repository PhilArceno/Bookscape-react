import React, { useState,useEffect, useRef } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';


function AccountDetail() {
  const [account, setAccount] = useState({});
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
        account.operationType = d.operationType;
        account.amount = d.amount;
        account.recordedTime = d.recordedTime;
        account.userId = d.user.id;
        account.userName = d.user.userName;
        account.userEmail = d.user.email;
        account.userPhoneNumber = d.user.phoneNumber
        setAccount(account);
      });
     },[]);
  
  return (
    <div className="container">
      <div class="card m-2">
        <div class="card-header">Account Detail</div>
        <div class="card-body">
        <p>Id: {account.id}</p>
        <p>AccountOperationType:{account.operationType}</p>
        <p>Amount:{account.amount}</p>
        
        <br/>
        <p>User Id: {account.userId}</p>
        <p>Name: {account.userName}</p>
        <p>Email:{account.userEmail}</p>
        <p>Phone Number:{account.userPhoneNumber}</p><br/>
        
       
        
     
        
        
        
        </div>
      </div>
    </div>      
    );
  }
  
  
  export default AccountDetail;