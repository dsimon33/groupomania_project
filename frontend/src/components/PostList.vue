<template>
  <div class="containerPL">
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
            class="btn btn-outline-secondary search__Btn"
            type="button"
            @click="searchTitle"
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <h1>Liste des Publications</h1>
      <div class="card cardPost">
        <div
          class="card-body post"
          :class="{ active: index == currentIndex }"
          v-for="(post, index) in posts"
          :key="index"
          @click="setActivePost(post, index)"
        >
          <p class="card-texte usernameCreatePost">
            <font-awesome-icon icon="user" /><span style="white-space: pre-line;" :title= "post.userpost.introduction" >   {{ post.userpost.username }} </span>
          </p>
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="publicationDate">post publié le {{ post.createdAt }}</p>
          <p class="card-texte descriptionPost" style="white-space: pre-line;">{{ post.description }}</p>
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
  margin: auto;
  width: 85%;
  max-width: 100%;
  }
  

.cardPost {
  align-items: center;
  margin: auto;
  padding: 0px;
  background :transparent;
  border-style : none;
  max-width: 100%;
  width: 85%;

}

.post {
    align-items: center;
    min-width: 100%;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    background: linear-gradient(rgb(47, 124, 255), skyblue);
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
      background-color: white;
      text-align: center;
      font-size: 18px;
      min-height: 80px;


}

.search__Btn {
  background-color: skyblue;
  
}

.search__Btn:hover {
    background-color: rgb(47,124,255);
  }



</style>>
