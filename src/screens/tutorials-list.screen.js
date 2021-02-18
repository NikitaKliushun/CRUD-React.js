{/* import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
//    this.searchTitle = this.searchTitle.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      page: 1,
      count: 0,
      pageSize: 3,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  getRequestParams(searchTitle, page, pageSize) {
  let params = {};

  if (searchTitle) {
    params["title"] = searchTitle;
  }

  if (page) {
    params["page"] = page - 1;
  }

  if (pageSize) {
    params["size"] = pageSize;
  }

  return params;
}

  retrieveTutorials() {

    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);


    TutorialDataService.getAll(params)
      .then(response => {
        const { tutorials, totalPages } = response.data;
        this.setState({
          tutorials: tutorials,
          count: totalPages
        });
        /*if (page > totalPages)
        {
          this.setState({
            page: 1,
            tutorials: tutorials,
            count: totalPages
          });
        }
        else {
                this.setState({
                  tutorials: tutorials,
                  count: totalPages
                });
        };*/
/*        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
    const {page,count} = this.state;
    if (page > count - 1)
    {
      this.setState({
        page: 1,
        currentTutorial: null,
        currentIndex: -1
      });
    }
    else {
        this.setState({
          currentTutorial: null,
          currentIndex: -1
        });
      };

  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

/*  searchTitle() {
    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }*/

/*  updatePublished(tutorial) {
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
            this.retrieveTutorials();
              console.log(response);
          })
          .catch(e => {
            console.log(e);
          });
    }

    deleteTutorial(tutorial) {

      TutorialDataService.delete(tutorial.id)
        .then(response => {
          console.log(response.data);
          this.retrieveTutorials();
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
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

    handlePageSizeChange(event) {
        this.setState(
          {
            pageSize: event.target.value,
            page: 1
          },
          () => {
        //    this.retrieveTutorials();
            this.refreshList();
          }
        );
    }


  render() {
      const { searchTitle, tutorials, currentTutorial, currentIndex, page, count, pageSize } = this.state;


      return (
        <div className="list row">

          <Search
            handleChange={}
            handleSearch={}
            searchValue={searchTitle}
          />

          <div className="col-md-6">
            <h4>Tutorials List</h4>

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
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={this.handlePageChange}
              />
            </div>

            <ul className="list-group">
              {tutorials &&
                tutorials.map((tutorial, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    key={index}
                  >
                    {tutorial.title}
                  </li>
                ))}
            </ul>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllTutorials}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentTutorial ? (
              <div>
                <h4>Tutorial</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTutorial.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentTutorial.description}
                </div>
                <div>
                  <label>
                    <strong>User ID:</strong>
                  </label>{" "}
                  {currentTutorial.user}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTutorial.published ? "Published" : "Pending"}
                </div>

                <Link
                  to={"/tutorials/" + currentTutorial.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
                <Link
                  className="badge badge-warning"
                  onClick={() => this.updatePublished(currentTutorial)}
                >
                    {currentTutorial.published ? "UnPublish" : "Publish"}
                </Link>
                <Link
                  className="badge badge-warning"
                  onClick={() => this.deleteTutorial(currentTutorial)}
                >
                    Delete
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  } */}

