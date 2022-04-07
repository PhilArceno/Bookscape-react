import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';

function AccountEdit() {

  let {id} = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [account, setAccount] = useState({});

  useEffect(()=>{
    
    Axios.get(config.url.API_URL+`/api/AccountOperations/${id}`,{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
      .then((response)=>{
        var account = response.data;
        var d = response.data;
        var account = {};
        account.userName = d.user.userName;
        account.userId = d.user.userId;
        account.userEmail= d.user.userEmail;
        account.accountOperationType = d.accountOperationType;
        account.amount=d.amount;
        account.recordedTime =d.recordedTime;
       
       
        const fields = ['amount',  'recordedTime'];
        fields.forEach(field => setValue(field, account[field]));
        setAccount(account);
      });
    },[]);

  const onSubmitHandler = data => {
    console.log(data);
    var User = {
       Id:data.userId,
       UserName: data.userName,
       Email:data.email
       };
    var body = {
        OperationType:data.OperationType,
        Amount:data.amount,
        RecordedTime:data.recordedTime,
        Loan:data.loan,
        User: User
        };
    Axios.put(config.url.API_URL+`/api/AccountOperations/${id}` +'?amount='+data.amount,
      body,
      {
        headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}` 
      }
    })
      .then((response)=>{
          navigate("/admin/account/list");
      }).catch((error)=>{
        setError(error.message);
      });
  };
  

  const validationSchema = Yup.object().shape({
    
    amount: Yup.number()
      .required('Amount is Required'),
    
  
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  return (
    <div className="container">
    {error?(<div className="alert alert-danger">{error}</div>):""}
    <div className="row">
        <div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card"><br/>
            <h3 className ="text-center"> Update Amount </h3>
            <div className ="card-body">
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <input name="Id" type="hidden" value={account.id}/>
      User Name :{account.userName}<br/>
      <div className="form-group">
        <label className="control-label m-1">Amount</label>
        <input
          name="amount"
          type="amount"
          {...register('amount')}
          className={`form-control m-1 ${errors.amount ? 'is-invalid' : ''}`}
        />
       </div>
      <div className="form-group"><br/>
        <button  type="submit" className="btn btn-primary m-2">
          Submit
        </button>
        <Link to="/admin/account/list" className="btn btn-danger ml-2">Cancel</Link>
      </div>
    </form>
    </div></div></div></div>
    );
  }
  
  export default AccountEdit;
