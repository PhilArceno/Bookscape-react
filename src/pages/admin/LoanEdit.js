import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';

function LoanEdit() {

  let {id} = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loan, setLoan] = useState({});

  useEffect(()=>{
    
    Axios.get(config.url.API_URL+`/api/Loans/${id}`,{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
    .then((response)=>{
        var d = response.data;
        var loan = {};
        loan.id = d.id;
        loan.startDate = d.startDate
        loan.dueDate = d.dueDate;
        loan.returnDate= d.returnDate;
        loan.renewCount= d.renewCount;
        loan.userId = d.user.id;
        loan.userName = d.user.userName;
        loan.bookId = d.book.id;
        loan.title = d.book.title;
        loan.isbn = d.book.isbn;
        const fields = ['isbn', 'startDate', 'dueDate','renewCount','returnDate','userId'];
        fields.forEach(field => setValue(field, loan[field]));
        setLoan(loan);
        
      });
     },[]);
  
  const onSubmitHandler = data => {
    console.log(data);
    var body = {
        startDate:data.startDate,
        dueDate:data.dueDate,
        userId:data.userId
           };
    Axios.put(config.url.API_URL+`/api/Loans/${id}`,
      body,
      {
        headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
      .then((response)=>{
          navigate("/admin/Loan/list");
      }).catch((error)=>{
        setError(error.message);
      });
  };
  const validationSchema = Yup.object().shape({
    
    dueDate: Yup.string()
      .required('DueDate is Required'), 
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
            <h3 className ="text-center"> Update Loan </h3>
            <div className ="card-body">
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <input name="Id" type="hidden" value={loan.id}/>
       Book ISBN: {loan.isbn}<br/>
       User Name :{loan.userName}<br/>
       <div className="form-group">
        <label className="control-label m-1">StartDate</label>
        <input
          name="startDate"
          type="datetime-local"
          {...register('startDate')}
          className={`form-control m-1 ${errors.dueDate ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.dueDate?.message}</div>
      </div> 
      <div className="form-group">
        <label className="control-label m-1" >Due Date</label>
        <input
          name="dueDate"
          type="datetime-local" 
          {...register('dueDate')}
          className={`form-control m-1  ${errors.dueDate ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.dueDate?.message}</div>
      </div>
      <div className="form-group"><br/>
        <button  type="submit" className="btn btn-primary m-2">
          Submit
        </button>
        <Link to="/admin/loan/list" className="btn btn-danger ml-2">Cancel</Link>
      </div>
    </form>
    </div></div></div></div>
    );
  }

  export default LoanEdit;