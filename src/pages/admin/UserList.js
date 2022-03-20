import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';

function UserList() {

  const [error, setError] = useState('');
  const [userList,setUserList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    /*
    Axios.get("http://localhost:3001/api/user")
    .then((response)=>{
      setBookList(response.data);
    });
    */
    var userlist = [
      {'Id':1, 'UserName':'lynne1','Email':'Lynne1@123.com','PhoneNumber':'123456'},
      {'Id':2, 'UserName':'lynne2','Email':'Lynne2@123.com','PhoneNumber':'123456'},
      {'Id':3, 'UserName':'lynne3','Email':'Lynne3@123.com','PhoneNumber':'123456'},
      {'Id':4, 'UserName':'lynne4','Email':'Lynne4@123.com','PhoneNumber':'123456'}
      ];
      setUserList(userlist);
     },[userList]);

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