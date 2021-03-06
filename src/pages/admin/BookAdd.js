import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';
import {ISBN as validateISBN} from "../../helpers/yupValidators";
function BookAdd() {

  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const onSubmit = data => {
    
    Axios.post(config.url.API_URL+"/api/Books",
    {
      Title:data.Title,
      Author:data.Author,
      Publisher:data.Publisher,
      Subject:data.Subject,
      ISBN:data.ISBN,
       Dewey:data.Dewey,
       CoverImage:data.CoverImage, 
       Description:data.Description,
       TotalCopies:data.TotalCopies,
       CopiesLoaned:data.copiesLoaned
      },
       {
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
    Title: Yup.string()
      .required('Title is required'),
      Author: Yup.string()
      .required('Author is required'),
      Publisher: Yup.string()
      .required('Publisheris required'),
      ISBN: validateISBN,
  });


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <div className="container ">
    {error?(<div className="alert alert-danger">{error}</div>):""}
    <div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card"><br/>
        <h3 className = "text-center"> Create New Book </h3>
				<div className = "card-body"></div>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Title</label>
        <input
          name="Title"
          type="text"
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
          {...register('CopiesLoaned')}
          className={`form-control ${errors.CopiesLoaned ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.CopiesLoaned?.message}</div>
      </div>
     
        
      <div className="form-group"><br/>
        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
        <Link to="/admin/book/list" className="btn btn-danger ml-2">Cancel</Link>
      </div><br/>
    </form>
    </div></div>
    );
  }
  
  export default BookAdd;