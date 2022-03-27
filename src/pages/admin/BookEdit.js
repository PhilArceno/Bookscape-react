import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';


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
        setBook(response.data);
      });
      
     },[]);

     const setTitle = data => {
      setBook({Title:data});
    }
    const setAuthor = data => {
      setBook({Author:data});
    }
    const setPublisher = data => {
      setBook({Publisher:data});
    }
    const setSubject = data => {
      setBook({Subject:data});
    }
    const setIJSBNr = data => {
      setBook({IJSBN:data});
    }
    const setDewey = data => {
      setBook({Dewey:data});
    }
    const setCoverImage = data => {
      setBook({CoverImageer:data});
    }
    const setDescriptiont = data => {
      setBook({Descriptiont:data});
    }
    const setTotalCopies = data => {
      setBook({TotalCopies:data});
    }
    const setCopiesLoaned = data => {
      setBook({CopiesLoaned:data});
    }


  const onSubmit = data => {
    console.log(data);
    var body ={
      Title:data.Title,
      Author:data.Author,
      Publisher:data.Publisher,
      Subject:data.Subject,
      IJSBN:data.ISBN,
       Dewey:data.Dewey,
       CoverImage:data.CoverImage,
        Description:data.Description,
        TotalCopies:data.TotalCopies,
        CopiesLoaned:data.CopiesLoaned
    }
    Axios.put(config.url.API_URL+`api/Books/${id}`,
   body, {
    headers : {
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`, 
    }
   })
      .then((response)=>{
        navigate("/admin/book/list");
        }).catch((error)=>{
        setError('error.message');
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
    <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
          <br/>  <h4 className="text-center"> Update Book </h4>
            <div className="card-body">

    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="Id" type="hidden" defaultValue={book.id}/>
      <div className="form-group" onChange={ (event) => setTitle(event.target.value) } >
        <label className="control-label m-1">Title</label>
        <input
          name="Title"
          type="text"
         value={book.title}
          {...register('Title')}
          className={`form-control m-2 ${errors.Title ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Title?.message}</div>
      </div>
      <div className="form-group" onChange={ (event) => setAuthor(event.target.value) } >
        <label className="control-label m-1">Author</label>
        <input
          name="Author"
          type="text"
          value={book.author}
          {...register('Author')}
          className={`form-control m-2 ${errors.Author ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Author?.message}</div>
      </div>
      <div className="form-group" onChange={ (event) => setPublisher(event.target.value) } >
        <label className="control-label m-1">Publisher</label>
        <input
          name="Publisher"
          type="text"
          value={book.publisher}
          {...register('Publisher')}
          className={`form-control m-2 ${errors.Publisher ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Publisher?.message}</div>
      </div>
      <div className="form-group"onChange={ (event) => setSubject(event.target.value) } >
        <label className="control-label m-1">Subject</label>
        <input
          name="Subject"
          type="text"
          value={book.subject}
          {...register('Subject')}
          className={`form-control m-2 ${errors.Subject ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Subject?.message}</div>
      </div>
      <div className="form-group"onChange={ (event) => setIJSBNr(event.target.value) } >
        <label className="control-label m-1">ISBN</label>
        <input
          name="ISBN"
          type="text"
         value={book.iSBN}
          {...register('ISBN')}
          className={`form-control m-2 ${errors.ISBN ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.ISBN?.message}</div>
      </div>
      <div className="form-group" onChange={ (event) => setDewey(event.target.value) }>
        <label className="control-label m-1">Dewey</label>
        <input
          name="Dewey"
          type="text"
          value={book.dewey}
          {...register('Dewey')}
          className={`form-control m-2 ${errors.Dewey ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Dewey?.message}</div>
      </div>
      <div className="form-group" onChange={ (event) => setCoverImage(event.target.value) } >
        <label className="control-label m-1" >CoverImage</label>
        <input
          name="CoverImage"
          type="text"
          value={book.coverImage}
          {...register('CoverImage')}
          className={`form-control m-2 ${errors.CoverImage ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.CoverImage?.message}</div>
      </div>
      <div className="form-group" onChange={ (event) => setDescriptiont(event.target.value) }>
        <label className="control-label m-1">Description</label>
        <input
          name="Description"
          type="text"
          value={book.description}
          {...register('Description')}
          className={`form-control m-2 ${errors.Description ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.Description?.message}</div>
      </div>
      <div className="form-group" onChange={ (event) => setTotalCopies(event.target.value) }>
        <label className="control-label m-1" >TotalCopies</label>
        <input
          name="TotalCopies"
          type="text"
          value={book.totalCopies}
          {...register('TotalCopies')}
          className={`form-control m-2 ${errors.TotalCopies ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.TotalCopies?.message}</div>
      </div>
      <div className="form-group"onChange={ (event) => setCopiesLoaned(event.target.value) }>
        <label className="control-label m-1">CopiesLoaned</label>
        <input
          name="CopiesLoaned"
          type="text"
          value={book.copiesLoaned}
          {...register('CopiesLoaned')}
          className={`form-control m-2 ${errors.CopiesLoaned ? 'is-invalid' : ''}`}
        />
        <div className="invalid-feedback">{errors.CopiesLoaned?.message}</div>
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