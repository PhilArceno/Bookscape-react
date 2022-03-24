import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';

function BookDetail() {

  const [book, setBook] = useState({});
  
  useEffect(()=>{
    
    let {id} = useParams();
    Axios.get(`https://localhost:7098/api/Books/${id}`)
      .then((response)=>{
        setBook(response.data);
      });
      setBook(book);
   }, []);
  return (
    <div className="container">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-body">
        <p>Id: {book.Id}</p>
        <p>Title: {book.Title}</p>
        <p>Author: {book.Author}</p>
        <p>Publisher: {book.Publisher}</p>
        <p>Subject: {book.Subject}</p>
        <p>ISBN: {book.ISBN}</p>
        <p>Dewey: {book.Dewey}</p>
        <p>CoverImage: {book.CoverImage}</p>
        <p>Description: {book.Description}</p>
        <p>TotalCopies: {book.TotalCopies}</p>
        <p>CopiesLoaned: {book.CopiesLoaned}</p>
        </div>
      </div>
    </div>     );
  }
  
  export default BookDetail;