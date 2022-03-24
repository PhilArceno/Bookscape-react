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
    
    Axios.put("http://localhost:7098/api/user",{Id:data.Id, UserName:data.UserName,Email:data.Email,PhoneNumber:data.PhoneNumber})
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
      <input name="Id" type="hidden" value={user.Id}/>
      <div className="form-group">
        <label>UserName</label>
        <input
          name="UserName"
          type="text"
          defaultValue={user.UserName}
          {...register('UserName')}
          className={`form-control ${errors.UserName ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.UserName?.message}</div>
      </div>
      <div className="form-group">
        <label>body</label>
        <input
          name="Email"
          type="text"
          defaultValue={user.Email}
          {...register('Email')}
          className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Email?.message}</div>
      </div> 
      <div className="form-group">
        <label>PhoneNumber</label>
        <input
          name="PhoneNumber"
          type="text"
          defaultValue={user.PhoneNumber}
          {...register('PhoneNumber')}
          className={`form-control ${errors.PhoneNumber ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.PhoneNumber?.message}</div>
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