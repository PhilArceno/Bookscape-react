import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import Axios from 'axios';
import { Box, Heading, Image } from '@chakra-ui/react';

function BookList() {

  const [error, setError] = useState('');
  const [bookList,setBookList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    
    Axios.get("https://localhost:7098/api/Books")
    .then((response)=>{
      setBookList(response.data);
    });
     },[bookList]);

  
  const EditBook = (id)=>{
        navigate("/admin/book/edit/"+id);
    };

  const deleteBook = (id)=>{
    console.log('delete book id:'+id);
  };

  return (
    
      <div className="container">
        <a href="/admin/book/add">Add New Book</a><br/>
        <table className="table table-borderless">
        <thead> 
          <tr>
          <td>Title</td>
        <td>Author</td>
        <td>Publisher</td>
        <td>Subject</td>
		    <td>CoverImage</td>
        <td>Description</td>
        </tr>
        </thead>
        {bookList.length > 0 ? bookList.map((book)=>{
          return (<tr key={(book.id)}>
            <td><a href={'/admin/book/'+book.id}>{book.title}</a></td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>{book.subject}</td>
            <td><Image src={book.coverImage} maxW="20"/></td>
            <button onClick={()=>{EditBook(book.id)}}>Edit</button>
            <button onClick={()=>{deleteBook(book.id)}}>Delete</button></tr>
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