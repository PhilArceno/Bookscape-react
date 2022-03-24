import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';

function UserDetail() {

  const [user, setUser] = useState({});

  useEffect(()=>{
    
    let {id} = useParams();
    Axios.get(`https://localhost:7098/api/user/${id}`)
      .then((response)=>{
        setUser(response.data);
      });
     
      setUser(user);
     },[]);
  
  return (
    <div className="container">
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
