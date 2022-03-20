import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';

function UserDetail() {

  const [user, setUser] = useState({});

  useEffect(()=>{
    /*
    let {id} = useParams();
    Axios.get(`http://localhost:3001/api/user/${id}`)
      .then((response)=>{
        setUser(response.data);
      });
    */  
    var user = 
      {'Id':2, 'UserName':'lynne2','Email':'Lynne2@123.com','PhoneNumber':'123456'};
      setUser(user);
     },[]);
  
  return (
    <div>
      <div class="card">
        <div class="card-header"></div>
        <div class="card-body">
        <p>Id: {user.Id}</p>
        <p>UserName: {user.UserName}</p>
        <p>Email: {user.Email}</p>
        <p>PhoneNumber: {user.PhoneNumber}</p>
        </div>
      </div>
    </div>      
    );
  }
  
  export default UserDetail;
