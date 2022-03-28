import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';

function UserDetail() {

  const [user, setUser] = useState({});
  let {id} = useParams();

  useEffect(()=>{
    
    Axios.get(`https://localhost:7098/api/Users/${id}`,{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
      .then((response)=>{
        setUser(response.data);
      });
     
      setUser(user);
     },[]);
  
  return (
    <div className="container m-2">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-body">
        <p>Id: {user.id}</p>
        <p>UserName: {user.userName}</p>
        <p>Email: {user.email}</p>
        <p>PhoneNumber: {user.phoneNumber}</p>
        </div>
      </div>
    </div>      
    );
  }
  
  export default UserDetail;
