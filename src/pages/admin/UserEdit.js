import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Axios from 'axios';
import { config } from '../../helpers/constants';
import * as validate from "../../helpers/yupValidators";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

function UserEdit() {
  let { id } = useParams();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    Axios.get(config.url.API_URL + `/api/Users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }).then(response => {
      console.log(response.data);
      var user = response.data;
      const fields = ['userName', 'email', 'phoneNumber'];
      fields.forEach(field => setValue(field, user[field]));
      setUser(user);
    });
  }, []);

  const onSubmitHandler = data => {
    console.log(data);
    fetch(config.url.API_URL + `/api/Users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        UserName: data.userName,
        Email: data.email,
        PhoneNumber: data.phoneNumber,
        Password: data.password,
        PasswordConfirm: data.passwordConfirm,
      }),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      },
    })
      .then(async response => {
        if (!response.ok) {
          throw Error(await response.text());
        } else response.text();
      })
      .then(text => {
        console.log(text);
        navigate('/admin/user/list');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const validationSchema = yup.object().shape({
    userName: validate.username,
    email: validate.email,
    phoneNumber: validate.phoneNumber,
    password: yup.string().max(24),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  return (
    <div className="container">
      {error ? <div className="alert alert-danger">{error}</div> : ''}
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
          <br />
          <h3 className="text-center"> Update User </h3>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <input name="Id" type="hidden" value={user.id} />
              <div className="form-group">
                <label className="control-label m-1">UserName</label>
                <input
                  name="userName"
                  type="text"
                  {...register('userName')}
                  className={`form-control m-1  ${
                    errors.userName ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.userName?.message}
                </div>
              </div>
              <div className="form-group">
                <label className="control-label m-1">Email</label>
                <input
                  name="email"
                  type="text"
                  {...register('email')}
                  className={`form-control m-1 ${
                    errors.email ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
              <div className="form-group">
                <label className="control-label m-1">PhoneNumber</label>
                <input
                  name="phoneNumber"
                  type="text"
                  {...register('phoneNumber')}
                  className={`form-control m-1 ${
                    errors.phoneNumber ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.phoneNumber?.message}
                </div>
              </div>
              <div className="form-group">
                <label className="control-label m-1">
                  Password (Leave Blank to leave unchanged)
                </label>
                <input
                  name="password"
                  type="text"
                  {...register('password')}
                  className={`form-control m-1 ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>
              <div className="form-group">
                <label className="control-label m-1">Confirm Password</label>
                <input
                  name="passwordConfirm"
                  type="text"
                  {...register('passwordConfirm')}
                  className={`form-control m-1 ${
                    errors.passwordConfirm ? 'is-invalid' : ''
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.passwordConfirm?.message}
                </div>
              </div>
              <div className="form-group">
                <br />
                <button type="submit" className="btn btn-primary m-2">
                  Submit
                </button>
                <Link to="/admin/user/list" className="btn btn-danger ml-2">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
