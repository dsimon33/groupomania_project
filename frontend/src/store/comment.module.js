import CommentDataService from '../services/CommentDataService';

const comment = localStorage.getItem('comment');
const initialState = comment
 

export const commentAdd = {
  namespaced: true,
  state: initialState,
  actions: {
    addComment({ commit }, comment) {
      return CommentDataService.addComment(comment).then(
        response => {
          commit('commentaire enregistré');
          return Promise.resolve(response.data);
        },
        error => {
          commit('problème enregistrement du commentaire');
          return Promise.reject(error);
        }
      );
    }
  }
};