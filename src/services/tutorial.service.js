import http from "../http-common";

class TutorialDataService {
  getAll(params) {
    return http.get("/tutorials", {params});
  }

  getAllByUser(id, params) {
    return http.get(`/tutorials/user/${id}`, {params});
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(id, data) {
    return http.post(`/tutorials/${id}`, data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

/*  findByTitle(title, params) {
    return http.get(`/tutorials?title=${title}`, {params});
  }*/
}

export default new TutorialDataService();
