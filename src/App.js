import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import './App.css';
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
//import AddUser from "./components/add-user.component";
import AddUser from './components/add-user';
import User from "./components/user.component";
import UsersList from "./components/users-list.component";
import FormVanilla from './components/FormVanilla';
import DefaultImg from './assets/default-img.jpg';
import UserDataService from './services/user.service';
import EditUser from './components/edit-user';
// import { Provider } from 'react-redux';
// import store from './store/store';
// import COMPONENT_1_W from './components/wrapComponents/component_1_w';
// import COMPONENT_2_W from './components/wrapComponents/component_2_w';


class App extends Component {
  render() {
    return (

  //  <Provider store={store}>

 //   <COMPONENT_1_W />
 //   <COMPONENT_2_W />

      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
              CRUD
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
            {/*  <li className="nav-item">
                  <Link to={"/add-user"} className="nav-link">
                    Add User
                  </Link>
              </li> */}
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
              <Route exact path="/add/:id" component={AddTutorial} />
              <Route path="/tutorials/:id" component={Tutorial} />
              <Route exact path="/users" component={UsersList} />
              {/*<Route exact path="/add-user" component={AddUser} />*/}
              <Route path="/users/:id" component={EditUser} />
              {/*<Route
                path="/add-user"
                render={() => (
                  <FormVanilla />
                )}
              />*/}

              <Route path="/add-user" render={() => ( <AddUser /> )} />
            </Switch>
          </div>
        </div>
      </Router>

 //   </Provider>
    );
  }
}

export default App;
