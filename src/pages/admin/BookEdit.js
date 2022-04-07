import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';
import {ISBN as validateISBN} from "../../helpers/yupValidators";


function BookEdit() {

  let {id} = useParams();
  const [error, setError] = useState('');
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  
  useEffect(()=>{
    
    Axios.get(config.url.API_URL+`/api/Books/${id}`,{
      headers : {
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
      }

    })
      .then((response)=>{
        console.log(response.data);
        var book = response.data;
        const fields = ['title', 'author', 'publisher','subject','isbn','dewey','coverImage','description','totalCopies','copiesLoaned'];
        fields.forEach(field => setValue(field, book[field]));
        setBook(book);
      });
     },[]);

  const onSubmitHandler = data => {
    console.log(data);
    var body ={
      Title:data.title,
      Author:data.author,
      Publisher:data.publisher,
      Subject:data.subject,
      ISBN:data.isbn,
       Dewey:data.dewey,
       CoverImage:data.coverImage,
        Description:data.description,
        TotalCopies:data.totalCopies,
        CopiesLoaned:data.copiesLoaned
    }
    Axios.put(config.url.API_URL+`/api/Books/${id}`,
   body, {
    headers : {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
    }
   })
      .then((response)=>{
        navigate("/admin/book/list");
        }).catch((error)=>{
        setError(error.message);
      });
  };
  
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    dewey: Yup.number()
    .required(' Dewey is required'),
    totalCopies: Yup.number()
    .required('TotalCopies is required'),
    copiesLoaned: Yup.number()
    .required('CopiesLoaned is required'),
    isbn: validateISBN,
   subject: Yup.string()
  .required(' Subject is required'),
   author: Yup.string()
  .required('Author is required'),
  publisher: Yup.string()
  .required('Publisher is required'),
  coverImage: Yup.string()
  .required('CoverImage is required'),
  description: Yup.string()
  .required('Description is required'),
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
        <div className="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
          <br/>  <h4 className="text-center"> Update Book </h4>
            <div className="card-body">

    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <input name="Id" type="hidden" value={book.id}/>
      <div className="form-group"  >
        <label className="control-label m-1">Title</label>
        <input
          name="title"
          type="text"
        
          {...register('title')}
          className={`form-control m-2 ${errors.title ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.title?.message}</div>
      </div>
      <div className="form-group"  >
        <label className="control-label m-1">Author</label>
        <input
          name="author"
          type="text"
        
          {...register('author')}
          className={`form-control m-2 ${errors.author ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.author?.message}</div>
      </div>
      <div className="form-group"  >
        <label className="control-label m-1">Publisher</label>
        <input
          name="publisher"
          type="text"
        
          {...register('publisher')}
          className={`form-control m-2 ${errors.publisher ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.publisher?.message}</div>
      </div>
      <div className="form-group"  >
        <label className="control-label m-1">Subject</label>
        <input
          name="subject"
          type="text"
         
          {...register('subject')}
          className={`form-control m-2 ${errors.subject ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.subject?.message}</div>
      </div>
      <div className="form-group"  >
        <label className="control-label m-1">ISBN</label>
        <input
          name="isbn"
          type="text"
      
          {...register('isbn')}
          className={`form-control m-2 ${errors.isbn ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.isbn?.message}</div>
      </div>
      <div className="form-group" >
        <label className="control-label m-1">Dewey</label>
        <input
          name="dewey"
          type="text"
       
          {...register('dewey')}
          className={`form-control m-2 ${errors.dewey ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.dewey?.message}</div>
      </div>
      <div className="form-group"  >
        <label className="control-label m-1" >CoverImage</label>
        <input
          name="coverImage"
          type="text"
      
          {...register('coverImage')}
          className={`form-control m-2 ${errors.coverImage ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.coverImage?.message}</div>
      </div>
      <div className="form-group" >
        <label className="control-label m-1">Description</label>
        <input
          name="description"
          type="text"
        
          {...register('description')}
          className={`form-control m-2 ${errors.description ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.description?.message}</div>
      </div>
      <div className="form-group" >
        <label className="control-label m-1" >TotalCopies</label>
        <input
          name="totalCopies"
          type="text"
       
          {...register('totalCopies')}
          className={`form-control m-2 ${errors.totalCopies ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.totalCopies?.message}</div>
      </div>
      <div className="form-group" >
        <label className="control-label m-1">CopiesLoaned</label>
        <input
          name="copiesLoaned"
          type="text"
       
          {...register('copiesLoaned')}
          className={`form-control m-2 ${errors.copiesLoaned ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.copiesLoaned?.message}</div>
      </div>
      <div className="form-group" >
        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
        <Link to="/admin/book/list" className="btn btn-danger ml-2">Cancel</Link>
      </div>
    </form>
    </div></div></div></div>
    );
  }
  
  export default BookEdit;