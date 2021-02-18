import React, { Component } from "react";
import UserDataService from "../services/user.service";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination"

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchLogin = this.onChangeSearchLogin.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
//    this.refreshTutorialsList = this.refreshTutorialsList.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
//    this.searchLogin = this.searchLogin.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleTutorialsPageChange = this.handleTutorialsPageChange.bind(this);
    this.handleTutorialsPageSizeChange = this.handleTutorialsPageSizeChange.bind(this);

    this.state = {
      users: [],
      tutorials: [],
      currentTutorial: null,
      currentUser: null,
      currentTutorialIndex: -1,
      currentIndex: -1,
      searchLogin: "",
      page: 1,
      count: 0,
      pageSize: 3,
      tutorialPage: 1,
      tutorialCount: 0,
      tutorialPageSize: 3
    };

    this.pageSizes = [3,6,9];
    this.tutorialsPageSizes = [3,6,9];
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchLogin(e) {
    const searchLogin = e.target.value;

    this.setState({
      searchLogin: searchLogin
    });
  }


  getRequestParams(searchLogin,page,pageSize) {

    let params = {};

    if (searchLogin) { params["login"] = searchLogin };
    if (page) { params["page"] = page - 1 };
    if (pageSize) { params["size"] = pageSize };

    return params;

  }

  retrieveUsers() {

    const {searchLogin,page,pageSize} = this.state;
    const params = this.getRequestParams(searchLogin,page,pageSize);

    UserDataService.getAll(params)
      .then(response => {

        const {users,totalPages} = response.data;

        this.setState({
          users: users,
          count: totalPages
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getTutorialsRequestParams(tutorialPage,tutorialPageSize) {

    let params = {};

    if (tutorialPage) { params["page"] = tutorialPage - 1 };
    if (tutorialPageSize) { params["size"] = tutorialPageSize };

    return params;

  }

  retrieveTutorials(userID) {

    const {tutorialPage,tutorialPageSize} = this.state;
    const params = this.getTutorialsRequestParams(tutorialPage,tutorialPageSize);

    console.log(userID);

    TutorialDataService.getAllByUser(userID, params)
      .then(response => {

        const {tutorials1,totalPages1} = response.data;

        this.setState({
          tutorials: tutorials1,
          tutorialCount: totalPages1
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
    const {page,count} = this.state;
    if (page > count - 1)
    {
      this.setState({
        page: 1
      });
    };
  }

 refreshTutorialsList(userID) {
   console.log(userID);
    this.retrieveTutorials(userID);
    this.setState({
      currentTutorial: null,
      currentTutorialIndex: -1
    });
    const {tutorialPage,tutorialCount} = this.state;
    if (tutorialPage > tutorialCount - 1)
    {
      this.setState({
        tutorialPage: 1
      });
    };
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
    this.retrieveTutorials(user.id);
    this.refreshTutorialsList(user.id);
  }

  setActiveTutorial(tutorial, tutorialIndex) {
    this.setState({
      currentTutorial: tutorial,
      currentTutorialIndex: tutorialIndex
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial(tutorial) {

    let user = this.state.currentUser;

    TutorialDataService.delete(tutorial.id)
      .then(response => {
        console.log(response.data);
        this.retrieveTutorials(user.id);
        this.refreshTutorialsList(user.id);
      })
      .catch(e => {
        console.log(e);
      });
  }

updatePublished(tutorial) {
    if (tutorial.published) {
                              var data = { published: false }
                              this.setState(prevState => ({
                                currentTutorial: {
                                  ...prevState.currentTutorial,
                                  published: false
                                }
                              }));
                            }
    else {
            var data = { published: true }
            this.setState(prevState => ({
              currentTutorial: {
                ...prevState.currentTutorial,
                published: true
              }
            }));
         }
      TutorialDataService.update(tutorial.id, data)
        .then(response => {
          this.retrieveTutorials(tutorial.user);
            console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
  }

  handlePageSizeChange (event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
              this.refreshList();
            }
    );

  }

  handlePageChange(event, value) {
      this.setState(
        {
          page: value,
        },
        () => {
        //  this.retrieveTutorials();
          this.refreshList();
        }
      );
    }

    handleTutorialsPageSizeChange (event) {
      let user = this.state.currentUser;
      this.setState(
        {
          tutorialPageSize: event.target.value,
          tutorialPage: 1
        },
        () => {
                this.refreshTutorialsList(user.id);
              }
      );

    }

      handleTutorialsPageChange(event, value) {
        let user = this.state.currentUser;
          this.setState(
            {
              tutorialPage: value,
            },
            () => {
            //  this.retrieveTutorials();
              this.refreshTutorialsList(user.id);
            }
          );
        }


/*  searchLogin() {
    UserDataService.findByLogin(this.state.searchLogin)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }*/

  deleteUser() {
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.retrieveUsers();
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
      const {

                searchLogin,
                users,
                currentUser,
                currentIndex,
                tutorials,
                currentTutorial,
                currentTutorialIndex,
                pageSize,
                count,
                page,
                tutorialPageSize,
                tutorialCount,
                tutorialPage,

            } = this.state;

      return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by login"
                value={searchLogin}
                onChange={this.onChangeSearchLogin}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.refreshList}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <h4>Users List</h4>

            <div className="mt-3">
              {"Items per Page: "}
              <select onChange={this.handlePageSizeChange} value={pageSize}>
                {this.pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={0}
                boundaryCount={1}

                shape="rounded"
                onChange={this.handlePageChange}
              />
            </div>

            <ul className="list-group">
              {users &&
                users.map((user, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveUser(user, index)}
                    key={index}
                  >
                    {user.login}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllUsers}
            >
              Remove All
            </button>
            <Link
              to={"/add-user/"}
              className="m-3 btn btn-sm btn-danger"
            >
              Add User
            </Link>
          </div>

            <div className="col-md-3">
              {currentUser ? (

                <div>
                  <h4>{currentUser.login}</h4>
                  <img src={currentUser.imageData} width="140"/>
                  <hr/>
                  <p><b>Name: </b>{currentUser.firstName}&nbsp;{currentUser.lastName}</p>
                  <p><b>Age: </b>{currentUser.age}</p>
                  <p><b>E-mail: </b>{currentUser.email}</p>

                  <hr/>
                  <div>

                    <div className="mt-3">

                      <select onChange={this.handleTutorialsPageSizeChange} value={tutorialPageSize}>
                        {this.tutorialsPageSizes.map((tutorialSize) => (
                          <option key={tutorialSize} value={tutorialSize}>
                            {tutorialSize}
                          </option>
                        ))}
                      </select>

                      <Pagination
                        className="my-3"
                        count={tutorialCount}
                        page={tutorialPage}
                        siblingCount={1}
                        boundaryCount={1}
                        shape="rounded"
                        onChange={this.handleTutorialsPageChange}
                      />
                    </div>

                    <ul className="list-group">
                      {tutorials &&
                        tutorials.map((tutorial, tutorialIndex) => (
                          <li
                            className={
                              "list-group-item " +
                              (tutorialIndex === currentTutorialIndex ? "active" : "")
                            }
                            onClick={() => this.setActiveTutorial(tutorial, tutorialIndex)}
                            key={tutorialIndex}
                          >
                            {tutorial.title}
                          </li>
                        ))}
                    </ul>

                  </div>

                  <Link
                    to={"/users/" + currentUser.id}
                    className="badge badge-warning"
                  >
                    Edit
                    <br/>
                    User
                  </Link>

                  <Link
                    to={"/add/" + currentUser.id}
                    className="badge badge-warning"
                  >
                    Add
                    <br/>
                    Tut
                  </Link>
                  <Link
                    className="badge badge-warning"
                    onClick={() => this.deleteUser()}
                  >
                      Delete
                      <br/>
                      User
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a User...</p>
                </div>
              )}
            </div>
            <div className="col-md-4">
              {currentUser ? (
                <div>
                  {currentTutorial ? (
                    <div>
                      <h4>Tutorial</h4>
                      <label>
                        <strong>Title:</strong>
                      </label>{" "}
                      {currentTutorial.title}
                      <br/>
                      <label>
                        <strong>Desc:</strong>
                      </label>{" "}
                      {currentTutorial.description}
                      <br/>
                      <label>
                        <strong>Status:</strong>
                      </label>{" "}
                      {currentTutorial.published ? "Published" : "Pending"}
                      <div>
                        <Link
                          className="badge badge-warning"
                          onClick={() => this.updatePublished(currentTutorial)}
                        >
                            {currentTutorial.published ? "UnPublish" : "Publish"}
                            <br/>
                            Tutorial
                        </Link>
                        <Link
                          to={"/tutorials/" + currentTutorial.id}
                          className="badge badge-warning"
                        >
                          Edit
                          <br/>
                          Tutorial
                        </Link>
                        <Link
                          className="badge badge-warning"
                          onClick={() => this.deleteTutorial(currentTutorial)}
                        >
                            Delete
                            <br/>
                            Tutorial
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div>
                    </div>
                  )}
                </div>
                ) : (
                  <div>
                  </div>
                )}
            </div>

        </div>
      );
    }
  }
