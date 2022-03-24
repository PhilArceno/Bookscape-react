import React, { useState,useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';

function BookEdit() {

  let {id} = useParams();
  const [error, setError] = useState('');
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  
  useEffect(()=>{
    
    Axios.get(`https://localhost:7098/api/Books/${id}`)
      .then((response)=>{
        setBook(response.data);
      });
      setBook(book);
     },[]);

  const onSubmit = data => {
    console.log(data);
    
    Axios.put("http://localhost:7098/api/Books",
    {Id:data.Id, Title:data.Title,Author:data.Author,Publisher:data.Publisher,Subject:data.Subject,ISBN:data.ISBN, Dewey:data.Dewey,CoverImage:data.CoverImage, Description:data.Description,TotalCopies:data.TotalCopies,CopiesLoaned:data.CopiesLoaned})
      .then((response)=>{
        if(response.data==='success'){
          navigate("/admin/book/list");
        }else{
          setError(response.data.sqlMessage);
        }
      }).catch((error)=>{
        setError('System Error');
      });
      
      navigate("/admin/book/list");
  };
  
  const handleChange = e => {
    setBook({
      [e.target.name]: e.target.value
    });
  };

  const validationSchema = Yup.object().shape({
    Title: Yup.string()
      .required('Title is required')
  });


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <div className="container">
    {error?(<div className="alert alert-danger">{error}</div>):""}
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="Id" type="hidden" defaultValue={book.Id}/>
      <div className="form-group">
        <label>Title</label>
        <input
          name="Title"
          type="text"
          defaultValue={book.Title}
          {...register('Title')}
          className={`form-control ${errors.Title ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Title?.message}</div>
      </div>
      <div className="form-group">
        <label>Author</label>
        <input
          name="Author"
          type="text"
          defaultValue={book.Author}
          {...register('Author')}
          className={`form-control ${errors.Author ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Author?.message}</div>
      </div>
      <div className="form-group">
        <label>Publisher</label>
        <input
          name="Publisher"
          type="text"
          defaultValue={book.Publisher}
          {...register('Publisher')}
          className={`form-control ${errors.Publisher ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Publisher?.message}</div>
      </div>
      <div className="form-group">
        <label>Subject</label>
        <input
          name="Subject"
          type="text"
          defaultValue={book.Subject}
          {...register('Subject')}
          className={`form-control ${errors.Subject ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Subject?.message}</div>
      </div>
      <div className="form-group">
        <label>ISBN</label>
        <input
          name="ISBN"
          type="text"
          defaultValue={book.ISBN}
          {...register('ISBN')}
          className={`form-control ${errors.ISBN ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.ISBN?.message}</div>
      </div>
      <div className="form-group">
        <label>Dewey</label>
        <input
          name="Dewey"
          type="text"
          defaultValue={book.Dewey}
          {...register('Dewey')}
          className={`form-control ${errors.Dewey ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Dewey?.message}</div>
      </div>
      <div className="form-group">
        <label>CoverImage</label>
        <input
          name="CoverImage"
          type="text"
          defaultValue={book.CoverImage}
          {...register('CoverImage')}
          className={`form-control ${errors.CoverImage ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.CoverImage?.message}</div>
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          name="Description"
          type="text"
          defaultValue={book.Description}
          {...register('Description')}
          className={`form-control ${errors.Description ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Description?.message}</div>
      </div>
      <div className="form-group">
        <label>TotalCopies</label>
        <input
          name="TotalCopies"
          type="text"
          defaultValue={book.TotalCopies}
          {...register('TotalCopies')}
          className={`form-control ${errors.TotalCopies ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.TotalCopies?.message}</div>
      </div>
      <div className="form-group">
        <label>CopiesLoaned</label>
        <input
          name="CopiesLoaned"
          type="text"
          defaultValue={book.CopiesLoaned}
          {...register('CopiesLoaned')}
          className={`form-control ${errors.CopiesLoaned ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.CopiesLoaned?.message}</div>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
    </div>
    );
  }
  
  export default BookEdit;