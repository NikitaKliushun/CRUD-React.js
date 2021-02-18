import React, {useEffect} from 'react';
import FormVanilla from './FormVanilla';
import UserDataService from "../services/user.service";


function EditUserScreen(props) {

  const [user, setUser] = React.useState({});

  const userID = props.match.params.id;

  useEffect(() => {
    async function getUserData() {
      const response = await UserDataService.get(userID);
      let responseToSend = {
                              login: response.data.login,
                              email: response.data.email,
                              firstName: response.data.firstName,
                              lastName: response.data.lastName,
                              age: response.data.age,
                              image: response.data.imageData
                           };
      setUser(responseToSend);
    }
    getUserData();
  },[]);

  const updateUser = data => {
    UserDataService.update(
      userID,
      data
    )
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <>
      < FormVanilla initialValues={user} screenKey={"edit"} screenFun={updateUser} />
    </>
  );

}

export default EditUserScreen;
