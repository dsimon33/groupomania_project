import PostDataService from '../services/PostDataService';

const post = localStorage.getItem('post');
const initialState = post
 

export const postAdd = {
  namespaced: true,
  state: initialState,
  actions: {
    addPost({ commit }, post) {
      return PostDataService.addPost(post).then(
        response => {
          commit('post enregistré');
          return Promise.resolve(response.data);
        },
        error => {
          commit('problème enregistrement du post');
          return Promise.reject(error);
        }
      );
    }
  }
};
