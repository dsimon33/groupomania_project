<template>
  <div class="container PLA">
    <div v-if="posts && user.roles[0] ==  role" class="edit-form">
    <div class="col-md-12 text-center">
      <h1>Liste des Publications signalées</h1>
      <div class="card cardPostSign">
        <div
          class="card-body postSign"
          :class="{ active: index == currentIndex }"
          v-for="(post, index,) in posts"
          :key="index"
          @click="setActivePost(post, index)"
        >
        <p class="card-texte usernameCreatePostSign">
            <font-awesome-icon icon="user" /><span style="white-space: pre-line;" :title= "post.userpost.introduction" >   {{ post.userpost.username }} </span>
          </p>
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="publicationDate">post publié le {{ post.createdAt }}</p>
          <p class="card-texte descriptionPostSign" style="xhite-space: pre-line;">{{ post.description }}</p>
          
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
      role: "ROLE_ADMINISTRATEUR",
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



.cardPostSign {
  align-items: center;
  margin: auto;
  padding: 0px;
  background :transparent;
  border-style : none;
  max-width: 100%;
  width: 85%;

}

.postSign {
    align-items: center;
    min-width: 100%;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    background: linear-gradient(rgb(47, 124, 255), skyblue);
    border-style: double;

}

.usernameCreatePostSign {
      font-style: italic;
      margin: 0px;
      text-align: left;
}

.publicationDate {
      font-size: 8px;
      text-align: center;
}

.descriptionPostSign {
      border-style: double;
      border-color: dark;
      background-color: white;
      text-align: center;
      font-size: 18px;
      min-height: 80px;


}
</style>>
