import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';

function UserEdit() {

  let {id} = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(()=>{
    
    Axios.get(config.url.API_URL+`/api/Users/${id}`,{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
      .then((response)=>{
        console.log(response.data);
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
    var body = {UserName:data.UserName,
        Email:data.Email,
        PhoneNumber:data.PhoneNumber,
        Password:'****'};
    Axios.put(config.url.API_URL+`/api/Users/${id}`,
      body,
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
    UserName: Yup.string()
    .required('UserName is required'),
    Email: Yup.string()
    .required('Email is Required'),
    PhoneNumber: Yup.string()
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
    <div className="container">
    {error?(<div className="alert alert-danger">{error}</div>):""}
    <div className="row">
        <div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card"><br/>
            <h3 className ="text-center"> Update User </h3>
            <div className ="card-body">
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="Id" type="hidden" value={user.id}/>
      <div className="form-group" onChange={ (event) => setUserName(event.target.value) } >
        <label className="control-label m-1" >UserName</label>
        <input
          name="UserName"
          type="text" 
          value={user.userName}
          {...register('UserName')}
          className={`form-control m-1  ${errors.UserName ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.UserName?.message}</div>
      </div>
      <div className="form-group" onChange={ (event) => setEmail(event.target.value) }>
        <label className="control-label m-1">Email</label>
        <input
          name="Email"
          type="text"
          value={user.email}
          {...register('Email')}
          className={`form-control m-1 ${errors.Email ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Email?.message}</div>
      </div> 
      <div className="form-group" onChange={ (event) => setPhoneNumber(event.target.value) }>
        <label className="control-label m-1">PhoneNumber</label>
        <input
          name="PhoneNumber"
          type="text"
          value={user.phoneNumber}
          {...register('PhoneNumber')}
          className={`form-control m-1 ${errors.PhoneNumber ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.PhoneNumber?.message}</div>
      </div> 
      <div className="form-group"><br/>
        <button  type="submit" className="btn btn-primary m-2">
          Submit
        </button>
        <Link to="/admin/user/list" className="btn btn-danger ml-2">Cancel</Link>
      </div>
    </form>
    </div></div></div></div>
    );
  }
  
  export default UserEdit;