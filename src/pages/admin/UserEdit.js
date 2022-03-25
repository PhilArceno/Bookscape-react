import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
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
    
    Axios.get(`https://localhost:7098/api/Users/${id}`)
      .then((response)=>{
        setUser(response.data);
      });
     
      setUser(user);
    },[]);

  const onSubmit = data => {
    console.log(data);
    
    Axios.put("http://localhost:7098/api/user",
    {id:data.Id, userName:data.UserName,email:data.Email,phoneNumber:data.PhoneNumber})
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
      <div className="form-group">
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
      <div className="form-group">
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
      <div className="form-group">
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
      </div>
    </form>
    </div>
    );
  }
  export default UserEdit;