import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';

function UserList() {

  const [error, setError] = useState('');
  const [userList,setUserList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    
    Axios.get("https://localhost:7098/api/Users",{
       headers: {
        accessToken: localStorage.getItem('accessToken')
    }
    }) .then((response)=>{
      setUserList(response.data);
    });
     },[]);

  const editUser = (id)=>{
      navigate("/admin/user/edit/"+id);
    };

  const deleteUser = (id)=>{
  };

  return (
      <div>
         <a href="/admin/user/add">new user</a><br/>
         <table className="table table-borderless">
        <tr><td>Id</td><td>UserName</td><td>Email</td><td>PhoneNumber</td></tr>
        {userList.map((user)=>{
          return (<tr>
            <td>{user.Id}</td>
            <td><a href={'/admin/user/'+user.Id}>{user.UserName}</a></td>
            <td>{user.Email}</td>
            <td>{user.PhoneNumber}</td>
            <button onClick={()=>{editUser(user.Id)}}>Edit</button>
            <button onClick={()=>{deleteUser(user.Id)}}>Delete</button>
          </tr>)
        })}
        </table>
      </div>
    
    );
  }
  
  export default UserList;
