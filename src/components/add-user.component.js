import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";
import FileBase from "react-file-base64";
import DefaultImg from '../assets/default-img.jpg';

//export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      login: "",
      submitted: false,
      baseImage: DefaultImg
    };
  }

/*  setDefaultImage() {
    this.setState({
      baseImage: DefaultImg
    });
} */

  onChangeLogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  saveUser() {
    var data = {
      login: this.state.login,
      imageData: this.state.baseImage
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          login: response.data.login,
          image: response.data.image,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getBaseFile(files) {
    this.setState({
      baseImage: files.base64,
      image: files.base64.toString()
    });

  /*  axios.post(`${API_URL}/image/uploadbase`, imageObj)
      .then((data) => {
        if (data.data.success) {
          alert("Image has been successfully uploaded using base64 format");
          this.setDefaultImage("base");
        }
      })
      .catch((err) => {
        alert("Error while uploading image using base64 format")
        this.setDefaultImage("base");
      }); */
  }


  newUser() {
    this.setState({
      id: null,
      login: "",
      baseImage: DefaultImg,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <div className="scs-add-tutorial">
                <button className="btn btn-success" onClick={this.newUser}>
                  Add new User
                </button>
                <Link
                    to={"/users/"}
                    className="btn btn-success"
                >
                    Back to Users
                </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="login">Login</label>
              <input
                type="text"
                className="form-control"
                id="login"
                required
                value={this.state.login}
                onChange={this.onChangeLogin}
                name="login"
              />
            </div>


            <div className="process">
                <p className="process__details">Profile Image</p>
                <img src={this.state.baseImage} alt="upload-image" className="process__image" width="140" />
                <hr/>
                <div className="process__upload-btn">
                  <FileBase type="file" multiple={false} onDone={this.getBaseFile.bind(this)} />
                </div>

            </div>

            <hr/>
            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
            <Link
                to={"/users/"}
                className="btn btn-success"
            >
                Back to Users
            </Link>
          </div>
        )}
      </div>
    );
  }
}
