import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';


function AccountAdd() {

  let {id} = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [account, setAccount] = useState({});


  const onSubmit = data => {
    
    Axios({
      method: 'post',
      url: config.url.API_URL+'/api/AccountOperations/payment/'+data.userId
        +'?amount='+data.amount,
      data: {
       
      },
      headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, }
    })
      .then((response)=>{
          navigate("/admin/account/list");
      }).catch((error)=>{
        setError(error.message);
      });
  };
  const validationSchema = Yup.object().shape({
    amount: Yup.number()
    .required(' Amount is required'),
    userId: Yup.string()
    .required(' userId is required'),
     
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
        <h3 className = "text-center"> Create New Payment </h3>
				<div className = "card-body"></div>
    <form onSubmit={handleSubmit(onSubmit)}>
    <input name="Id" type="hidden" value={account.userId}/>
    <div className="form-group">
        <label>User ID</label>
        <input
          name="userId"
          type="text"
          {...register('userId')}
          className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.userId?.message}</div>
      </div> 
      
       
      <div className="form-group">
        <label>Amount</label>
        <input
          name="amount"
          type="decimal"
          {...register('amount')}
          className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.amount?.message}</div>
      </div> 
     
       
      <div className="form-group" ><br/>
        <button type="submit" className="btn btn-primary m-2"  >
          Submit
        </button>
        <Link to="/admin/account/list" className="btn btn-danger ml-2">Cancel</Link>
      </div><br/>
    </form>
    </div></div></div>
    );
  }
  
  export default AccountAdd;