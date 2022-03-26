import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';

function BookAdd() {

  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const onSubmit = data => {
    
    Axios.post("https://localhost:7098/api/Books",
    {title:data.Title,author:data.Author,publisher:data.Publisher,subject:data.Subject,iSBN:data.ISBN, Dewey:data.Dewey,coverImage:data.CoverImage, description:data.Description,totalCopies:data.TotalCopies,copiesLoaned:data.CopiesLoaned})
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
      <div className="form-group">
        <label>Title</label>
        <input
          name="Title"
          type="text"
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
          {...register('CopiesLoaned')}
          className={`form-control ${errors.copiesLoaned ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.copiesLoaned?.message}</div>
      </div>
     
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/admin/book/list" className="btn btn-danger ml-2">Cancel</Link>
      </div>
    </form>
    </div>
    );
  }
  
  export default BookAdd;
