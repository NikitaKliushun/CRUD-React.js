import React from 'react';
import FileBase from "react-file-base64";
import { Link } from "react-router-dom";

function Form({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  handleImgUpload,
  touched,
  values,
  image
}) {

  return (
    <div>
      <div>
        For the form to be valid:
        <ul>
          <li>All fields must be filled</li>
          <li>First name, last name and login must be at least three characters</li>
          <li>Age must be between 18 and 99</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="form-group">
          <label className="validation-input" htmlFor="first-name-input">
            First Name *
            <input
              type="text"
              className="form-control"
              id="first-name-input"
              placeholder="Enter first name"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              name="firstName"
              required
            />
            <div className="errors-wrapper">
              &nbsp;{touched.firstName && errors.firstName}
            </div>
          </label>
          <label className="validation-input" htmlFor="last-name-input">
            Last Name *
            <input
              type="text"
              className="form-control"
              id="last-name-input"
              placeholder="Enter last name"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              name="lastName"
              required
            />
            <div className="errors-wrapper">
              &nbsp;{touched.lastName && errors.lastName}
            </div>
          </label>
          <label className="validation-input" htmlFor="login-input">
            Login *
            <input
              type="text"
              className="form-control"
              id="login-input"
              placeholder="Enter login"
              value={values.login}
              onChange={handleChange}
              onBlur={handleBlur}
              name="login"
              required
            />
            <div className="errors-wrapper">
              &nbsp;{touched.login && errors.login}
            </div>
          </label>
        </div>
        <div className="form-group">
          <label className="validation-input" htmlFor="email">
            Email address *
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              required
            />
            <div className="errors-wrapper">
              &nbsp;{touched.email && errors.email}
            </div>
          </label>
          <label className="validation-input" htmlFor="age">
            Age *
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Enter age"
              value={values.age || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              name="age"
              min="0"
              required
            />
            <div className="errors-wrapper">
               &nbsp;{touched.age && errors.age}
            </div>
          </label>
        </div>

        <div className="process">
            <p className="process__details">Profile Image</p>
            <img src={image} alt="upload-image" className="process__image" width="140" />
            <hr/>
            <div className="process__upload-btn">
              <FileBase type="file" multiple={false} onDone={handleImgUpload} />
            </div>

        </div>
        <hr/>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
