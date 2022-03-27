import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Axios from 'axios';
import { Box, Heading, Image } from '@chakra-ui/react';


function BookDetail() {

  const [book, setBook] = useState({});
  let {id} = useParams();
  useEffect(()=>{
    Axios.get(`https://localhost:7098/api/Books/${id}`)
      .then((response)=>{
        setBook(response.data);
      });
      setBook(book);
     },[]);
  return (
    <div className="container">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-body">
        <p>Id: {book.id}</p>
        <p>Title: {book.title}</p>
        <p>Author: {book.author}</p>
        <p>Publisher: {book.publisher}</p>
        <p>Subject: {book.subject}</p>
        <p>ISBN: {book.iSBN}</p>
        <p>Dewey: {book.dewey}</p>
        <p>CoverImage: <td><Image src={book.coverImage} maxW="100"/></td></p>
        <p>Description: {book.description}</p>
        <p>TotalCopies: {book.totalCopies}</p>
        <p>CopiesLoaned: {book.copiesLoaned}</p>
        </div>
      </div>
    </div>     );
  }
  
  export default BookDetail;