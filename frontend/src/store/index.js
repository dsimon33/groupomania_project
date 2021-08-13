import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { postAdd } from './post.module';
import { commentAdd} from './comment.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth, postAdd, commentAdd
  }
});
