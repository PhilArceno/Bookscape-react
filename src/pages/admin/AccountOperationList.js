import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
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
        account.operationType = d.operationType;
        account.amount = d.amount;
        account.recordedTime = d.recordedTime;

        
        account.userId = d.user.id;
        account.userName = d.user.userName;

       
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
         <a class = "btn btn-primary btn-sm mb-3" href="/admin/account/add">Add New Amount</a><br/></div>
		</div>
         <table class = "table table-striped table-bordered">
           <thead class = "table-dark">
        <tr>
        <th>UserName</th>
        <th>Amount</th>
        <th>Recorderd Time</th>

        <th>Update</th>
        <th>Delete</th>
       
         
        </tr>
           </thead>
           <tbody>
        {accountList.length > 0 ? accountList.map((account)=>{
          return (<tr key={(account.id)} >
            <td><a href={'/admin/account/'+account.id}>{account.userName}</a></td>
            <th>{account.amount}</th>   
            <th>{account.recordedTime }</th> 
           
          
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