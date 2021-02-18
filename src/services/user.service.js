import http from "../http-common";

class UserDataService {
  getAll(params) {
    return http.get("/users",{params});
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  getByLogin(login) {
    return http.get(`/users/login/${login}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

/*  findByLogin(login) {
    return http.get(`/users?login=${login}`);
  }*/

}

export default new UserDataService();
