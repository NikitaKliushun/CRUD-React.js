import React, { Component } from "react";
import UserDataService from "../services/user.service";
import DefaultImg from '../assets/default-img.jpg';
import FileBase from "react-file-base64";
import { Link } from "react-router-dom";


export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        login: "",
        imageData: DefaultImg
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeLogin(e) {
    const login = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          login: login
        }
      };
    });
  }

  onChange (e) {

    const {name, value} = e.target;

    console.log(name,value);

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          [name]: value
        }
      };
    });

  }

  getBaseFile(files) {
    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          imageData: files.base64.toString()
        }
      };
    });
  }

  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

/*  updatePublished(status) {
    var data = {
      id: this.state.currentTutorial.id,
      title: this.state.currentTutorial.title,
      description: this.state.currentTutorial.description,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  } */

  updateUser() {
    UserDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
     const { currentUser } = this.state;

     return (
       <div>
         {currentUser ? (
           <div className="edit-form">
             <h4>User</h4>
             <form>
               <div className="form-group">
                 <label htmlFor="login">Login</label>
                 <input
                   type="text"
                   className="form-control"
                   id="login"
                   name="login"
                   value={currentUser.login}
                   onChange={this.onChange}
                 />
                 <label htmlFor="first-name">First Name</label>
                 <input
                   type="text"
                   className="form-control"
                   id="first-name"
                   value={currentUser.firstName}
                   onChange={this.onChange}
                   name="firstName"
                 />
                 <label htmlFor="last-name">Last Name</label>
                 <input
                   type="text"
                   className="form-control"
                   id="last-name"
                   value={currentUser.lastName}
                   onChange={this.onChange}
                   name="lastName"
                 />
                 <label htmlFor="age">Age</label>
                 <input
                   type="number"
                   className="form-control"
                   id="age"
                   value={currentUser.age}
                   onChange={this.onChange}
                   name="age"
                 />
                 <label htmlFor="email">Email</label>
                 <input
                   type="text"
                   className="form-control"
                   id="email"
                   value={currentUser.email}
                   onChange={this.onChange}
                   name="email"
                 />
                 <label htmlFor="login">Image</label>
                 <br/>
                 <img src={currentUser.imageData} width="140"/>
                 <hr/>
                 <div className="process">
                     <div className="process__upload-btn">
                       <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
                     </div>
                 </div>
               </div>
             </form>

             <button
               className="badge badge-danger mr-2"
               onClick={this.deleteUser}
             >
               Delete
             </button>

             <button
               type="submit"
               className="badge badge-success"
               onClick={this.updateUser}
             >
               Update
             </button>
             <hr/>
             <p>{this.state.message}</p>
             <Link
                 to={"/users/"}
                 className="btn btn-success"
             >
                 Back to Users
             </Link>
           </div>
         ) : (
           <div>
             <br />
             <p>Please click on a User...</p>
           </div>
         )}
       </div>
     );
   }
 }
