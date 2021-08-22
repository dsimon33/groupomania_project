import http from "../http-common";


class PostDataService {
  getAll() {
    return http
    .get(`/posts`)
  }

  getAllReport() {
     return  http
    .get(`/posts/report`)
  }

  get(id) {
    return http
    .get(`/posts/${id}`);
  }

    create(data) {
    return http
    .post('/posts', {
      title: data.title,
      description: data.description,
      attachment: data.attachment,
      report: data.report,
      userId: data.userId
    });
  }
 
  update(id, data) {
    console.log(data);
    return http
    .put(`/posts/${id}`, data);
  }

  delete(id) {
    return http
    .delete(`/posts/${id}`);
  }

  deleteAll() {
    return http
    .delete(`/posts`);
  }

  findByTitle(title) {
    return http
    .get(`/posts?title=${title}`);
  }
}

export default new PostDataService();