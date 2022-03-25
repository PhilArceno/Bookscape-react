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
    {id:data.Id, title:data.Title,author:data.Author,publisher:data.Publisher,subject:data.Subject,iSBN:data.ISBN, dewey:data.Dewey,coverImage:data.CoverImage, description:data.Description,totalCopies:data.TotalCopies,copiesLoaned:data.CopiesLoaned})
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
      <input name="Id" type="hidden" defaultValue={book.id}/>
      <div className="form-group">
        <label>Title</label>
        <input
          name="Title"
          type="text"
          defaultValue={book.title}
          {...register('Title')}
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.title?.message}</div>
      </div>
      <div className="form-group">
        <label>Author</label>
        <input
          name="Author"
          type="text"
          defaultValue={book.author}
          {...register('Author')}
          className={`form-control ${errors.author ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.author?.message}</div>
      </div>
      <div className="form-group">
        <label>Publisher</label>
        <input
          name="Publisher"
          type="text"
          defaultValue={book.publisher}
          {...register('Publisher')}
          className={`form-control ${errors.publisher ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.publisher?.message}</div>
      </div>
      <div className="form-group">
        <label>Subject</label>
        <input
          name="Subject"
          type="text"
          defaultValue={book.subject}
          {...register('Subject')}
          className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.subject?.message}</div>
      </div>
      <div className="form-group">
        <label>ISBN</label>
        <input
          name="ISBN"
          type="text"
          defaultValue={book.iSBN}
          {...register('ISBN')}
          className={`form-control ${errors.iSBN ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.iSBN?.message}</div>
      </div>
      <div className="form-group">
        <label>Dewey</label>
        <input
          name="Dewey"
          type="text"
          defaultValue={book.dewey}
          {...register('Dewey')}
          className={`form-control ${errors.dewey ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.dewey?.message}</div>
      </div>
      <div className="form-group">
        <label>CoverImage</label>
        <input
          name="CoverImage"
          type="text"
          defaultValue={book.coverImage}
          {...register('CoverImage')}
          className={`form-control ${errors.coverImage ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.coverImage?.message}</div>
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          name="Description"
          type="text"
          defaultValue={book.description}
          {...register('Description')}
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.description?.message}</div>
      </div>
      <div className="form-group">
        <label>TotalCopies</label>
        <input
          name="TotalCopies"
          type="text"
          defaultValue={book.totalCopies}
          {...register('TotalCopies')}
          className={`form-control ${errors.totalCopies ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.totalCopies?.message}</div>
      </div>
      <div className="form-group">
        <label>CopiesLoaned</label>
        <input
          name="CopiesLoaned"
          type="text"
          defaultValue={book.copiesLoaned}
          {...register('CopiesLoaned')}
          className={`form-control ${errors.copiesLoaned ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.copiesLoaned?.message}</div>
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