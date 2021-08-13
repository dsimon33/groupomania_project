<template>
  <div class="submit-form detailPost">
    <div v-if="!submitted">
      <div class="form-group ">
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

      <button @click="savePost" class="btn btn-success">Valider votre nouveau Post</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newPost">Add</button>
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
        user: JSON.parse(localStorage.getItem('user'))
      },
      submitted: false
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
        .then(response => {
          this.post.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newPost() {
      this.submitted = false;
      this.post = {};
    }
  }
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

.submit-form {
  max-width: 300px;
  margin: auto;
}

.introduction {
  display:flex;
  height :250px;
  padding-bottom: 200px;
  justify-content: center;
}

</style>