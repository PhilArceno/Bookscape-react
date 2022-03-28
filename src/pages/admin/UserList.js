import React, { useState,useEffect } from 'react';
import { Link, useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';
import { config } from '../../helpers/constants';

function UserList() {
  let { id } = useParams();
  const [error, setError] = useState('');
  const [userList,setUserList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    
    Axios.get(config.url.API_URL+"/api/Users",{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    }) .then((response)=>{
      setUserList(response.data);
    }).catch((error)=>{
      setError(error.message);
    });
    
     },[userList]);

  const editUser = (id)=>{
      navigate("/admin/user/edit/"+id);
    };
   
  const deleteUser = (id)=>{
   
    Axios.delete(config.url.API_URL+`/api/Users/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
  }).then((response) => {
          navigate('/admin/user/list');
    }).catch((error)=>{
      setError(error.message);
    });
  
  
  }
    
    

  return (
    <div class ="container">
       {error?(<div className="alert alert-danger">{error}</div>):""}
		<br/>
        
         <div class = "row">
			<div class = "col-lg-3">
         <Link class = "btn btn-primary btn-sm mb-3" to="/admin/user/add">Add New user</Link><br/></div>
		</div>
         <table class = "table table-striped table-bordered">
           <thead class = "table-dark">
        <tr><th>UserName</th>
        <th>Email</th>
        <th>PhoneNumber</th>
        <th>Update</th>
        <th>Delete</th>
        </tr>
           </thead>
           <tbody>
        {userList.length > 0 ? userList.map((user)=>{
          return (<tr key={(user.id)}>
            
            <td><Link to={'/admin/user/'+user.id}>{user.userName}</Link></td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td><button class = "btn btn-primary" onClick={()=>{editUser(user.id)}}>Update</button></td>
            <td><button  class = "btn btn-danger" onClick={()=>{deleteUser(user.id)}}>Delete</button></td>
            
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