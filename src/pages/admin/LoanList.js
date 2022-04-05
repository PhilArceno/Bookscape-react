import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { Box, Heading, Image } from '@chakra-ui/react';
import Axios from 'axios';
import { config } from '../../helpers/constants';

function LoanList() {
  let { id } = useParams();
  const [error, setError] = useState('');
  const [loanList,setLoanList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(()=>{
    
    Axios.get(config.url.API_URL+"/api/Loans",{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    }) .then((response)=>{
      var data = response.data;
      var loanList = []; 
      data.forEach(d => {
        var loan = {};
        loan.id = d.id;
        loan.startDate = d.startDate;
        loan.dueDate = d.dueDate;
        loan.returnDate= d.returnDate;
      
        
      
        loan.userName = d.user.userName;
        loan.bookId = d.book.id;
        loan.title = d.book.title;
        loan.isbn = d. book.isbn;
        loan.coverImage = d.book.coverImage
        loanList.push(loan);
      })
      setLoanList(loanList);
    }).catch((error)=>{
      setError(error.message);
    });
    
     },[]);

  const returnLoan = (id)=>{
      navigate("/admin/loan/return/"+id);
    };
    const editLoan = (id)=>{
      navigate("/admin/loan/edit/"+id);
    };
   
  const deleteLoan = (id)=>{
   
    Axios.delete(config.url.API_URL+`/api/Loans/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
  }).then((response) => {
          navigate('/admin/loan/list');
    }).catch((error)=>{
      setError(error.message);
    }); 
    window.location.reload();
  }
    
  return (
    <div class ="container">
       {error?(<div className="alert alert-danger">{error}</div>):""}
		<br/>
        
         <div class = "row">
			<div class = "col-lg-3">
         <a class = "btn btn-primary btn-sm mb-3" href="/admin/loan/add">Add New Loan</a><br/></div>
		</div>
         <table class = "table table-striped table-bordered">
           <thead class = "table-dark">
        <tr>
      
        
        <th>Book ISBN</th>
        <th>UserName</th>
        <th> StartDate</th>
        <th> DueDate</th>
        <th>Return</th>
        <th>Update</th>
        <th>Delete</th>
        <th>returnDate</th>
        </tr>
           </thead>
           <tbody>
        {loanList.length > 0 ? loanList.map((loan)=>{
          return (<tr key={(loan.id)}>
           
            <td><a href={'/admin/loan/'+loan.id}>{loan.isbn}</a></td>
          
            <td>{loan.userName}</td>
            <td>{loan.startDate}</td>
            <td>{loan.dueDate}</td>
            <td>{loan.returnDate}</td>        
            <td><button class = "btn btn-primary" onClick={()=>{returnLoan(loan.id)}}>Retrun</button></td>
            <td><button class = "btn btn-primary" onClick={()=>{editLoan(loan.id)}}>Update</button></td>
            <td><button class = "btn btn-danger" onClick={()=>{deleteLoan(loan.id)}}>Delete</button></td>    
          </tr>)
        })
        :
        ""
      }
        </tbody>
        </table>
      </div>
    
    );
  }
  
  export default LoanList;