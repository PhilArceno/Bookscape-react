import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';

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
        <a href="/admin/book/add">new Book</a><br/>
        <table className="table table-borderless">
        <tr><td>Id</td><td>Title</td><td>Author</td><td>Publisher</td><td>Subject</td>
		    <td>ISBN</td><td>Dewey</td><td>CoverImage</td><td>Description</td><td>TotalCopies</td><td>CopiesLoaned</td></tr>
        {bookList.map((book)=>{
          return (<tr>
            <td>{book.id}</td>
            <td><a href={'/admin/book/'+book.id}>{book.title}</a></td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
            <td>{book.subject}</td>
            <td>{book.iSBN}</td>
            <td>{book.dewey}</td>
            <td>{book.coverImage}</td>
            <td>{book.description}</td>
            <td>{book.totalCopies}</td>
            <td>{book.copiesLoaned}</td>
            <button onClick={()=>{EditBook(book.id)}}>Edit</button>
            <button onClick={()=>{deleteBook(book.id)}}>Delete</button>
          </tr>)
        })}
        </table>
      </div>
    
    );
  }
  
  export default BookList;