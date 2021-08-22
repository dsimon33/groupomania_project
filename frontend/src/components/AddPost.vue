<template>
  <div class="submit-form detailPost">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Votre titre</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="post.title"
          name="title"
        />
      </div>

      <div class="form-group detailPost">
        <span for="description">Votre texte</span>
        <textarea
          class="form-control introduction"
          id="description"
          required
          v-model="post.description"
          name="description"
        />
      </div>
      <div class="text-center" >
        <button @click="savePost" class="btn btn-success">
          Valider votre nouveau Post
        </button>
      </div>
    </div>

    <div v-else>
      <h4>Votre Post a été publié</h4>
      <div class="text-center">
      <button class="btn btn-success" @click="newPost">
        Créer un nouveau Post
      </button>
      </div>
    </div>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";

export default {
  name: "add-post",
  data() {
    return {
      post: {
        id: null,
        title: "",
        description: "",
        attachment: "",
        report: false,
        user: JSON.parse(localStorage.getItem("user")),
      },
      submitted: false,
    };
  },

  methods: {
    savePost() {
      let data = {
        title: this.post.title,
        description: this.post.description,
        attachment: this.post.attachment,
        report: this.post.report,
        userId: this.post.user.id,
      };
      console.log(data);

      PostDataService.create(data)
        .then((response) => {
          this.post.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPost() {
      this.submitted = false;
      this.post = {};
      location.reload();
    },
  },
};
</script>

<style lang="scss">
.detailPost {
  background: linear-gradient(rgb(47, 124, 255), skyblue);
  padding: 10px;
}

.submit-form {
  max-width: 300px;
  margin: auto;
}

.introduction {
  display: flex;
  height: 250px;
  padding-bottom: 200px;
}

.btn__newpost {
}
</style>