<template>
  <div class="container">
    <div v-if="posts && user.roles[0] ==  role" class="edit-form">
    <div class="col-md-12 text-center">
      <h4>liste des Publications signalées</h4>
      <div class="card bg-dark">
        <div
          class="card-body text-center bg-light"
          :class="{ active: index == currentIndex }"
          v-for="(post, index,) in posts"
          :key="index"
          @click="setActivePost(post, index)"
        >
          <h1 class="card-title">{{ post.title }}</h1>
          <p class="card-texte">{{ post.description }}</p>
          <p class="publicationDate">post publié le {{ post.createdAt }}</p>
          <p class="publicationDate">post modifié le {{ post.updatedAt }}</p>
        </div>
      </div>
    </div>
    </div>
    <div v-else>
        <p>Vous nêtes pas autorisés à accéder à cette page</p>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "posts-list",
  data() {
    return {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      title: this.title,
      role: "ROLE_ADMIN",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  methods: {
    retrievePosts() {
      PostDataService.getAllReport()
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },

    setActivePost(post, index) {
      this.currentPost = post;
      this.currentIndex = index;
      console.log(this.currentPost.id);
      this.$router.push("/posts/" + this.currentPost.id);
      location.reload();
    },

  },
  mounted() {
    this.retrievePosts();
  },
  
};
</script>



<style lang="scss">
.card {
  align-items: center;

  .card-body {
    align-items: center;
    min-width: 100%;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    padding: 30px;
    box-shadow: 15px 12px grey;

    .publicationDate {
      font-size: 8px;
    }
  }
}
</style>>
