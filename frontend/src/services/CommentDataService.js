import http from "../http-common";


class CommentDataService {

  getAll(postid) {
    return http
    .get(`/comments/${postid}`);
  }

  get(id) {
    return http
    .get(`/comments/${id}`);
  }
 
  create(data) {
    return http
    .post('/comments', {
      content: data.content,
      postId: data.postId,
      userId: data.userId
    });
  }

  update(id, data) {
    return http
    .put(`/comments/${id}`, data);
  }

  delete(id) {
    return http
    .delete(`/comments/${id}`);
  }

  deleteAll() {
    return http
    .delete("/comments");
  }

}

export default new CommentDataService();