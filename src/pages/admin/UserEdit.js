import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';


function UserEdit() {
  
  let {id} = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(()=>{
    
    Axios.get(`https://localhost:7098/api/Users/${id}`,{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
    .then((response)=>{
        setUser(response.data);
      });
    },[]);

    const setUserName = data => {
      setUser({UserName:data});
    }
    const setEmail = data => {
      setUser({Email:data});
    }
    const setPhoneNumber = data => {
      setUser({PhoneNumber:data});
    }
  const onSubmit = data => {
    console.log(data);
    
    Axios.put(`http://localhost:7098/api/user/${id}`,
    {Id:data.id, 
      UserName:data.userName,
      Email:data.email,
      PhoneNumber:data.phoneNumber},{
        headers : {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
        }
      })
      .then((response)=>{
        console.log(response);
        if(response.data==='success'){
          navigate("/admin/user/list");
        }else{
          setError(response.data.sqlMessage);
        }
      }).catch((error)=>{
        setError('System Error');
      });
      navigate("/admin/user/list");

  };
  const validationSchema = Yup.object().shape({
    UserName: Yup.string()
    .required('UserName is required')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  return (
    <div className="container">
    {error?(<div className="alert alert-danger">{error}</div>):""}
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="Id" type="hidden" value={user.id}/>
      <div className="form-group" onChange={ (event) => setUserName(event.target.value) } >
        <label>UserName</label>
        <input
          name="UserName"
          type="text"
          defaultValue={user.userName}
          {...register('UserName')}
          className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.userName?.message}</div>
      </div>
      <div className="form-group" onChange={ (event) => setEmail(event.target.value) } >
        <label>Email</label>
        <input
          name="Email"
          type="text"
          defaultValue={user.email}
          {...register('Email')}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.email?.message}</div>
      </div> 
      <div className="form-group"onChange={ (event) => setPhoneNumber(event.target.value) } >
        <label>PhoneNumber</label>
        <input
          name="PhoneNumber"
          type="text"
          defaultValue={user.phoneNumber}
          {...register('PhoneNumber')}
          className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.phoneNumber?.message}</div>
      </div> 
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/admin/user/list" className="btn btn-danger ml-2">Cancel</Link>
      </div>
    </form>
    </div>
    );
  }
  export default UserEdit;