import React, { useState,useEffect, useRef } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';

function LoanEdit() {
  const dueDateRef = useRef(null);
  const returnDateRef = useRef(null);
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
        let dueDate = new Date(d.dueDate).toISOString();
        let returnDate = new Date(d.returnDate).toISOString();
        dueDate = dueDate.substring(0,dueDate.length-1);
        returnDate = returnDate.substring(0,returnDate.length-1);
        var loan = {
          dueDate,
          returnDate,
          userName: d.user.userName,
          isbn: d.book.isbn
        };
        const fields = ['isbn', 'dueDate','overdue','returnDate','userId'];
        fields.forEach(field => setValue(field, loan[field]));
        setLoan(loan);
      });
     },[]);
  
  const onSubmitHandler = data => {
    console.log(data);
    var body = {
        DueDate: new Date(data.dueDate).toJSON(),
        ReturnDate:new Date(data.returnDate).toJSON(),
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
    dueDate: Yup.date()
      .required('Due Date is Required'), 
    returnDate: Yup.date()
      .required('Return Date is Required'), 
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
        <label className="control-label m-1" >Due Date</label>
        <input
        ref={dueDateRef}
          name="dueDate"
          type="datetime-local" 
          {...register('dueDate')}
          className={`form-control m-1  ${errors.dueDate ? 'is-invalid' : ''}`}
          step="any"
          />
        <div className="invalid-feedback">{errors.dueDate?.message}</div>
      </div>
      <div className="form-group">
        <label className="control-label m-1">Return Date</label>
        <input
          ref={returnDateRef}
          name="returnDate"
          type="datetime-local"
          {...register('returnDate')}
          className={`form-control m-1 ${errors.returnDate ? 'is-invalid' : ''}`}
          step="any"
        />
        <div className="invalid-feedback">{errors.returnDate?.message}</div>
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