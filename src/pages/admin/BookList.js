import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';

function BookList() {

  const [error, setError] = useState('');
  const [bookList,setBookList] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    /*
    Axios.get("http://localhost:3001/api/book")
    .then((response)=>{
      setBookList(response.data);
    });
    */
    var booklist = [
      {'Id':1,'Title':'hero1','Author':'Tom1','Publisher':'Disney1','Subject':'this is my hero1','ISBN':'123456', 'Dewey':10.2,'CoverImage':'http://11.jpg', 'Description':'my description','TotalCopies':200,CopiesLoaned:100},
      {'Id':2,'Title':'hero2','Author':'Tom2','Publisher':'Disney2','Subject':'this is my hero2','ISBN':'123456', 'Dewey':10.2,'CoverImage':'http://11.jpg', 'Description':'my description','TotalCopies':200,CopiesLoaned:100},
      {'Id':3,'Title':'hero3','Author':'Tom3','Publisher':'Disney3','Subject':'this is my hero3','ISBN':'123456', 'Dewey':10.2,'CoverImage':'http://11.jpg', 'Description':'my description','TotalCopies':200,CopiesLoaned:100}
      ];
      setBookList(booklist);
     },[bookList]);

  
  const EditBook = (id)=>{
        navigate("/admin/book/edit/"+id);
    };

  const deleteBook = (id)=>{
    console.log('delete book id:'+id);
  };

  return (
    
      <div>
        <a href="/admin/book/add">new Book</a><br/>
        <table className="table table-borderless">
        <tr><td>Id</td><td>Title</td><td>Author</td><td>Publisher</td><td>Subject</td>
		    <td>ISBN</td><td>Dewey</td><td>CoverImage</td><td>Description</td><td>TotalCopies</td><td>CopiesLoaned</td></tr>
        {bookList.map((book)=>{
          return (<tr>
            <td>{book.Id}</td>
            <td><a href={'/admin/book/'+book.Id}>{book.Title}</a></td>
            <td>{book.Author}</td>
            <td>{book.Publisher}</td>
            <td>{book.Subject}</td>
            <td>{book.ISBN}</td>
            <td>{book.Dewey}</td>
            <td>{book.CoverImage}</td>
            <td>{book.Description}</td>
            <td>{book.TotalCopies}</td>
            <td>{book.CopiesLoaned}</td>
            <button onClick={()=>{EditBook(book.Id)}}>Edit</button>
            <button onClick={()=>{deleteBook(book.Id)}}>Delete</button>
          </tr>)
        })}
        </table>
      </div>
    
    );
  }
  
  export default BookList;