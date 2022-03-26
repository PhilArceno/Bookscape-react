import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';

function UserAdd() {

  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const onSubmit = data => {
    
    Axios.post("https://localhost:7098/api/Users",
    {UserName:data.userName,Email:data.email,PhoneNumber:data.phoneNumber})
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
    <div className="container" >
    {error?(<div className="alert alert-danger">{error}</div>):""}
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>UserName</label>
        <input
          name="UserName"
          type="text"
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
  
  export default UserAdd;