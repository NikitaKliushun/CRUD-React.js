import React from 'react';
import Form from './Form';
import UserDataService from "../services/user.service";
import DefaultImg from '../assets/default-img.jpg';
import { useHistory } from "react-router-dom";

function FormVanilla({initialValues, screenKey, screenFun}) {

  console.log(initialValues);

  const nameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '') {
      return `${fieldName} is required`;
    }
    if (/[^a-zA-Z -]/.test(fieldValue)) {
      return 'Invalid characters';
    }
    if (fieldValue.trim().length < 3) {
      return `${fieldName} needs to be at least three characters`;
    }
    return null;
  };

  const emailValidation = email => {
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      return null;
    }
    if (email.trim() === '') {
      return 'Email is required';
    }
    return 'Please enter a valid email';
  };

  const ageValidation = age => {
    if (!age) {
      return 'Age is required';
    }
    if (age < 18) {
      return 'Age must be at least 18';
    }
    if (age > 99) {
      return 'Age must be under 99';
    }
    return null;
  };

  const imageValidation = image => {

    return null;

  }

  const loginValidation = login => {

    if (login.trim() === '') {
      return `Login is required`;
    }
    if (login.trim().length < 3) {
      return `Login needs to be at least three characters`;
    }
    return null;

/*    const res = UserDataService.getByLogin(login)
      .then (res => {
        loginExsist = res.data;
        console.log(loginExsist);
        return 'This login already exsists';
      })
      .catch (err => {
        console.log(err);
        return null;
      })


      if (loginExsist) {
                      return 'This login already exsists';
                    }
      else {
              return null;
      } */

      return null;

  }

  const validate = {
    firstName: name => nameValidation('First Name', name),
    lastName: name => nameValidation('Last Name', name),
    email: emailValidation,
    age: ageValidation,
    image: imageValidation,
    login: loginValidation
  };

  const [values, setValues] = React.useState(initialValues);

  console.log("values1: ",values);

  React.useEffect(() => {
    setValues(initialValues);
  },[initialValues]);

  console.log("values2: ",values);

  const [image, setImage] = React.useState(values.image);

  React.useEffect(() => {
    setImage(initialValues.image);
  },[initialValues]);

  console.log(image);

  const [errors, setErrors] = React.useState({});

  const [touched, setTouched] = React.useState({});

  const history = useHistory();

  // change event handler
  const handleChange = evt => {
    const { name, value: newValue, type } = evt.target;

    // keep number fields as numbers
    const value = type === 'number' ? +newValue : newValue;

    // save field values
    setValues({
      ...values,
      [name]: value,
    });

    // was the field modified
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const handleImgUpload = image => {
    console.log(image);
    setImage(image.base64);
  };

  const handleBlur = evt => {
    const { name, value } = evt.target;

    // remove whatever error was there previously
    const { [name]: removedError, ...rest } = errors;

    // check for a new error
    const error = validate[name](value);

    // // validate the field if the value has been touched
    setErrors({
      ...rest,
      ...(error && { [name]: touched[name] && error }),
    });
  };

  // form submit handler
  const handleSubmit = evt => {
    evt.preventDefault();

    // validate the form
    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validate[key](values[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      },
    );
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    console.log(errors);

    if (
      !Object.values(formValidation.errors).length && // errors object is empty
      Object.values(formValidation.touched).length ===
        Object.values(values).length && // all fields were touched
      Object.values(formValidation.touched).every(t => t === true) // every touched field is true
    ) {

      let data = {
        login: values.login,
        firstName: values.firstName,
        lastName: values.lastName,
        age: values.age,
        email: values.email,
        imageData: image
      };

      console.log(data);

      if (screenKey === "add") {

                                     /*const response = new Promise( (resolve, reject) =>
                                     {

                                         let funcRes = screenFun(data);
                                         console.log(funcRes);

                                         if (funcRes) {
                                          resolve("Promise resolved successfully");
                                         }
                                         else {
                                          reject(Error("Promise rejected"));
                                         }

                                     });

                                    response.then( result =>
                                    {
                                        let error = "This login already exsists";

                                        setErrors({
                                          ...errors,
                                          ...(error && { login: error }),
                                        });

                                        console.log(errors);
                                    },
                                    function(error)
                                    {
                                        UserDataService.create(data)  // do with async/await
                                          .then(response => {
                                            console.log(response);
                                          })
                                          .catch(e => {
                                            console.log(e);
                                          });
                                          history.push("/users");
                                    });*/

                                  /*async function checkLog(data) {
                                    let responseToSend = true;
                                    console.log(data);
                                    try {
                                            const responseToSend = await screenFun(data);
                                    }
                                    catch {
                                            responseToSend = false;
                                    }
                                    return responseToSend
                                  } */
                                  /*  let funcRes = checkLog(data);
                                    console.log("funcRes",funcRes);


                                      if (funcRes.result === false) {
                                                                UserDataService.create(data)  // do with async/await
                                                                  .then(response => {
                                                                    console.log(response);
                                                                  })
                                                                  .catch(e => {
                                                                    console.log(e);
                                                                  });
                                                                  history.push("/users");
                                                           }
                                      else {
                                              let error = "This login already exsists";

                                              setErrors({
                                                ...errors,
                                                ...(error && { login: error }),
                                              });

                                              console.log(errors);
                                           } */



                                  UserDataService.getByLogin(values.login)
                                    .then (res => {
                                      let loginExsist = res.data;

                                      if (loginExsist) {

                                                          let error = "This login already exsists";

                                                          setErrors({
                                                            ...errors,
                                                            ...(error && { login: error }),
                                                          });

                                                          console.log(errors);
                                                       }
                                    })
                                    .catch (err => {
                                      console.log(err);
                                      UserDataService.create(data)  // do with async/await
                                        .then(response => {
                                          console.log(response);
                                        })
                                        .catch(e => {
                                          console.log(e);
                                        });

                                      history.push("/users");
                                    })
                                };
      if (screenKey === "edit") {
                                  screenFun(data);
                                  history.push("/users");
                                }




    }
  };

  return (
    <>
      <Form
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleImgUpload={handleImgUpload}
        errors={errors}
        touched={touched}
        values={values}
        image={image}
      />
    </>
  );
}

export default FormVanilla;
