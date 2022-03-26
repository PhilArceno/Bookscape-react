import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';

function UserList() {

  const [error, setError] = useState('');
  const [userList,setUserList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    
    Axios.get("https://localhost:7098/api/Users",{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
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
         <a href="/admin/user/add">Add New User</a><br/>
         <table className="table table-borderless">
           <thead>
        <tr><th>UserName</th><th>Email</th><th>PhoneNumber</th></tr>
           </thead>
           <tbody>
        {userList.length > 0 ? userList.map((user)=>{
          return (<tr key={(user.id)}>
            
            <td><a href={'/admin/user/'+user.id}>{user.userName}</a></td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td><button onClick={()=>{editUser(user.id)}}>Edit</button></td>
            <td><button onClick={()=>{deleteUser(user.id)}}>Delete</button></td>
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
  
  export default UserList;
