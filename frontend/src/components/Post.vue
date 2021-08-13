<template>
  <div>
    <div v-if="currentPost && user.roles[0] == role" class="edit-form">
      <h1>Publication de {{ currentPost.userpost.username }} du {{ currentPost.createdAt }}</h1>
      <form>
        <div class="form-group">
          <label for="title">Titre</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="currentPost.title"
          />
        </div>
        <div class="form-group">
          <span>Descriptif</span>
          <textarea
            type="text"
            class="form-control"
            v-model="currentPost.description"
          />
        </div>

        <div class="form-group">
          <label><strong>Status:</strong></label>
          {{ currentPost.report ? "Ce post à été signalé" : "Ce post n'a pas été signalé comme non conforme" }}
        </div>
      </form>
      <div class="modifPost">
      <button
        class="badge badge-primary mr-2"
        v-if="currentPost.report"
        @click="updateReport(false)"
      >
        Enlever le signalement
      </button>
      <button
        v-else
        class="badge badge-primary mr-2"
        @click="updateReport(true)"
      >
        Signaler
      </button>

      <button class="badge badge-danger mr-2" @click="deletePost">
        Supprimer
      </button>

      <button type="submit" class="badge badge-success" @click="updatePost">
        Modifier
      </button>
    </div>
    </div>
    <div
      v-else-if="currentPost && user.id == currentPost.userId"
      class="edit-form"
    >
    <h1>Publication de {{ currentPost.userpost.username }}</h1>
      <form>
        <div class="form-group">
          <label for="title">Titre</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="currentPost.title"
          />
        </div>
        <div class="form-group">
          <span>Descriptif</span>
          <textarea
            type="text"
            class="form-control"
            v-model="currentPost.description"
          />
        </div>

        <div class="form-group">
          <label><strong>Status:</strong></label>
          {{ currentPost.report ? "Ce post à été signalé" : "" }}
        </div>
      </form>
      <div class="modifPost">
      <button class="badge badge-danger mr-2" @click="deletePost">
        Supprimer
      </button>

      <button type="submit" class="badge badge-success" @click="updatePost">
        Modifier
      </button>
      </div>
    </div>

    <div v-else>

      <div class="card-body text-center">
        <h1 class="PostUser">Publication de {{ currentPost.userpost.username }}</h1>
        <h2 class="card-title">{{ currentPost.title }}</h2>
        <h3 class="card-texte pubDetails">{{ currentPost.description }}</h3>
        <p class="publicationDate">
          post publié le {{ currentPost.createdAt }}
        </p>
        <button
          class="badge badge-primary mr-2"
          v-if="currentPost.report == true"
        ></button>
        <button
          v-else
          class="badge badge-primary mr-2"
          @click="updateReport(true)"
        >
          Signaler
        </button>
        <div class="form-group">
          <label><strong>Status:</strong>  Non signalée</label>
          {{
            currentPost.report
              ? "Cette publication à été signalé comme non approprié"
              : "Ciquer sur signaler si vous estimez que cette publication est inappropriée"
          }}
        </div>
      </div>
    </div>

    <div class="col-md-12 text-center">
      <h4>Liste des Commentaires</h4>
      <div class="card cardComments">
        <div
          class="card-body text-center bg-light blocComment"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <p class="userComment"><font-awesome-icon icon="user" />
             le {{comment.createdAt}}</p>
          <p class="descriptionComment">{{ comment.content }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-12 comment">
      <div class="form-group col-md-12">
        <span>Commenter cette publication :</span>
        <textarea
          type="text"
          class="form-control"
          v-model="newCommentText"
          name="content"
        />
      </div>
      <div  class="text-center">
      <button @click="saveComment" class="btn btn-success">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";
import CommentDataService from "../services/CommentDataService";

export default {
  name: "post",
  data() {
    return {
      posts : [],
      currentPost: "",
      comments: [],
      currentIndex: -1,
      newCommentText: "",
      role: "ROLE_ADMIN",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    getPost(id) {
      PostDataService.get(id)
        .then((response) => {
          this.currentPost = response.data.data;
          console.log(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    retrieveComments() {
      CommentDataService.getAll(this.$route.params.id)
        .then((response) => {
          this.comments = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateReport(status) {
      let data = {
        id: this.currentPost.id,
        title: this.currentPost.title,
        description: this.currentPost.description,
        report: status,
      };

      PostDataService.update(this.currentPost.id, data)
        .then((response) => {
          this.currentPost.report = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePost() {
      PostDataService.update(this.currentPost.id, this.currentPost)
        .then((response) => {
          console.log(response.data);
          this.message = "le post a été mis à jour !";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deletePost() {
      PostDataService.delete(this.currentPost.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "posts" });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    saveComment() {
      let data = {
        content: this.newCommentText,
        postId: this.currentPost.id,
        userId: this.user.id,
      };
      console.log(data);

      CommentDataService.create(data)
        .then((response) => {
          location.reload();
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getPost(this.$route.params.id);
    this.retrieveComments(this.$route.params.id);
  },
};
</script>

<style lang="scss">

.container {
  background: linear-gradient(rgb(47, 124, 255), skyblue);
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  margin: 0px;
}

.card {
  align-items: center;
  margin: 0px;
  padding: 0px;
  background :transparent;
  border-style : none;
}


.modifPost {
  text-align: center;
  margin-bottom: 30px;
}

.userComment {
  text-align: start;
  margin:0px;
  font-style: italic;
  margin-bottom: 10px;
}

.cardComments {
  margin-top: 10px;

}

.blocComment {
  padding: 10px;
  margin: 10px;
  max-width: 80%;
  width: 100%;
  border: 10px ridge skyblue;
}

.pubDetails {
  background: skyblue;
  max-width: 100%;
  width: 100%;
  border: 10px ridge rgb(47, 124, 255);

}




</style>