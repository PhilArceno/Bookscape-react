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
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
        <p>Id: {user.id}</p>
    );
  }
  
  export default UserDetail;
