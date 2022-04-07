import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';

function UserAdd() {

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const onSubmit = data => {
    
    Axios.post(config.url.API_URL+'/api/Users',
    {UserName:data.UserName,
      Email:data.Email,
      PhoneNumber:data.PhoneNumber,
      Password:data.Password
    },
      {
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
      .then((response)=>{
          navigate("/admin/user/list");
      }).catch((error)=>{
        setError(error.message);
      });
  };
 
  
  const validationSchema = Yup.object().shape({
    UserName: Yup.string().min(3)
    .required('UserName is required'),
     Email: Yup.string().matches(emailRegExp,'This is not a valid email address')
     .required('Email is Required'),
     Password: Yup.string().min(6).max(20)
     .required('Password is required'),
     ConfirmPassword: Yup.string()
     .oneOf([Yup.ref('Password'), null], 'Passwords must match').required('Please repeat password'),
     PhoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid,ex: 514-123-4567')
     .required('PhoneNumber is required')
    });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });


  return (
    <div className="container m-2">
    {error?(<div className="alert alert-danger">{error}</div>):""}
    <div className="row">
    <div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card"><br/>
        <h3 className = "text-center"> Create New User </h3>
				<div className = "card-body"></div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>UserName</label>
        <input
          name="UserName"
          type="text"
          {...register('UserName')}
          className={`form-control ${errors.UserName ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.UserName?.message}</div>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          name="Email"
          type="email"
          {...register('Email')}
          className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Email?.message}</div>
      </div> 
      <div className="form-group">
        <label>Password</label>
        <input
          name="Password"
          type="password"
          {...register('Password')}
          className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Password?.message}</div>
      </div> 
      <div className="form-group">
        <label>Confirm Password</label>
        <input
          name="ConfirmPassword"
          type="password"
          {...register('ConfirmPassword')}
          className={`form-control ${errors.ConfirmPassword ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.ConfirmPassword?.message}</div>
      </div> 
      <div className="form-group">
        <label>PhoneNumber</label>
        <input
          name="PhoneNumber"
          type="text"
          {...register('PhoneNumber')}
          className={`form-control ${errors.PhoneNumber ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.PhoneNumber?.message}</div>
      </div> 
      <div className="form-group" ><br/>
        <button type="submit" className="btn btn-primary m-2"  >
          Submit
        </button>
        <Link to="/admin/user/list" className="btn btn-danger ml-2">Cancel</Link>
      </div><br/>
    </form>
    </div></div></div>
    );
  }
  
  export default UserAdd;