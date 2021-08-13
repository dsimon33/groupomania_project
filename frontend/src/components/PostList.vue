<template>
  <div class="container">
    <div class="col-md-auto">
      <div class="input-group mb-3 search">
        <input
          type="text"
          class="form-control"
          placeholder="Rechercher une publication par son titre"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary menu__Btn"
            type="button"
            @click="searchTitle"
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <h1>liste des Publications</h1>
      <div class="card">
        <div
          class="card-body post"
          :class="{ active: index == currentIndex }"
          v-for="(post, index) in posts"
          :key="index"
          @click="setActivePost(post, index)"
        >
          <p class="card-texte usernameCreatePost">
            <font-awesome-icon icon="user" />  {{ post.userpost.username }}
          </p>
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="publicationDate">post publié le {{ post.createdAt }}</p>
          <p class="card-texte descriptionPost">{{ post.description }}</p>
        </div>
      </div>
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
      PostDataService.getAll()
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveposts();
      this.currentPost = null;
      this.currentIndex = -1;
    },

    setActivePost(post, index) {
      this.currentPost = post;
      this.currentIndex = index;
      console.log(this.currentPost.id);
      this.$router.push("/posts/" + this.currentPost.id);
    },

    searchTitle() {
      PostDataService.findByTitle(this.title)
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrievePosts();
  },
};
</script>



<style lang="scss">
h1, h2 {
  text-align: center;
  margin-top: 0px;
}

h2 {
  font-size: 120%;
}

.search {
  padding-top:20px;
  }

.card {
  align-items: center;
  margin: 0px;
  padding: 0px;
  background :transparent;
  border-style : none;
}

.post {
    align-items: center;
    min-width: 100%;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    background: white;
    border-style: double;

}

.usernameCreatePost {
      font-style: italic;
      margin: 0px
}

.publicationDate {
      font-size: 8px;
      text-align: center;
}

.descriptionPost {
      border-style: double;
      border-color: dark;
      background-color: skyblue;
      text-align: center;
      font-size: 18px

}

</style>>
