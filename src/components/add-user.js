import React from 'react';
import FormVanilla from './FormVanilla';
import DefaultImg from '../assets/default-img.jpg';
import UserDataService from "../services/user.service";

function AddUser() {

  const [response, setResponse] = React.useState(true);

  const initialValues = {
    age: 10,
    email: 'no@email',
    firstName: 'Mary',
    lastName: 'Jane',
    login: 'Login',
    image: DefaultImg
  };


/*  React.useEffect(() => {
    async function checkLog(data) {
      let responseToSend = true;
      try {
              const response = await UserDataService.getByLogin(data.login);
      }
      catch {
              responseToSend = false;
      }

      console.log("reponseToSend",responseToSend);

      return responseToSend;
    }
  },[]); */


//  const loginValidation = data => {

  /*   const response = new Promise( (resolve, reject) => {

     let name = 'Paul';

     if (name === 'Paul') {
      resolve("Promise resolved successfully");
     }
     else {
      reject(Error("Promise rejected"));
     }
    });

    let obj = {newName: ''};

    promise.then( result => {
     this.setState({name: result});
    }, function(error) {
     this.setState({name: error});
   });     */


  /*    async function checkLogin() {
        let responseToSend = true;

        try {
                const response = await UserDataService.getByLogin(data.login);
        }
        catch {
                responseToSend = false;
        }

        console.log("response.data",response.data);
        console.log("responseToSend",responseToSend);
        return responseToSend;
      }*/

/*    return checkLog(data);

} */

  return (
    <>
      < FormVanilla initialValues={initialValues} screenKey={"add"} />
    </>
  );

}

export default AddUser;
