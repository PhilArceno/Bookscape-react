import React, { useState,useEffect } from 'react';
import { useNavigate,useParams, Link } from "react-router-dom";
import Axios from 'axios';
import { Box, Heading, Image } from '@chakra-ui/react';
import { config } from '../../helpers/constants';



function BookList() {
  let { id } = useParams();
  const [error, setError] = useState('');
  const [bookList,setBookList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    
    Axios.get(config.url.API_URL+"/api/Books",{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
    })
    .then((response)=>{
      setBookList(response.data);
    }).catch((error)=>{
      setError(error.message);
    });
     },[]);

  
  const EditBook = (id)=>{
        navigate("/admin/book/edit/"+id);
    };

  const deleteBook = (id)=>{
    Axios.delete(config.url.API_URL+`/api/Books/${id}`, {
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }
  }).then((response) => {
          navigate('/admin/book/list');
    }).catch((error)=>{
      setError(error.message);
    });
  }

  return (
    
      <div className="container">
         {error?(<div className="alert alert-danger">{error}</div>):""}
		<br/>
         <div class = "row">
			<div class = "col-lg-3">
        <Link class = "btn btn-primary btn-sm mb-3" to="/admin/book/add">Add New Book</Link><br/></div></div>
        <table class = "table table-striped table-bordered">
        <thead class = "table-dark"> 
          <tr>
            <td>Title</td>
            <td>Author</td>
            <td>Publisher</td>
            <td>Subject</td>
		        <td>CoverImage</td>
            <td>Update<br/>Delete</td>
          
            </tr></thead>
        {bookList.length > 0 ? bookList.map((book)=>{
          return (
          <tr key={(book.id)}>
            <td><Link to={'/admin/book/'+ book.id}>{book.title}</Link></td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>{book.subject}</td>
           
          
            <td><Image src={book.coverImage} maxW="20"/></td>
            
            
            <button  class = "btn btn-primary m-2" onClick={()=>{EditBook(book.id)}}>Update</button>
            <button class = "btn btn-danger m-2 "  onClick={()=>{deleteBook(book.id)}}>Delete</button>
            </tr>
            )
          })
          :
          ""
        }
          
          </table>
         
        </div>
      
      );
    }
  export default BookList;