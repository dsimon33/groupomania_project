<template>
  <div class="containerProfile text-center">
    <form>
      <div class="form-group">
        <span>Ma Présentation</span>
        <textarea
          name="présentation"
          placeholder="ajouter plusieurs lignes"
          type="text"
          class="form-control"
          v-model="currentUser.introduction"
        />
      </div>
    </form>

    <h2>Accés autorisé:</h2>
    <p v-for="(role, index) in currentUser.roles" :key="index">{{ role }}</p>
    <div>
      <button
        type="submit"
        class="badge badge-success"
        @click="updateIntroduction"
      >
        Modifier sa présentation
      </button>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Profile",

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    updateIntroduction() {
      UserService.update(this.currentUser.id, this.currentUser)
        .then((response) => {
          console.log(response.data);
          this.message = "la présentation a été mise à jour !";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>

<style lang="scss">
.containerProfile {
  background: linear-gradient(rgb(47, 124, 255), skyblue);
  width: 100%;
  max-width: 600px;
  margin: auto;
  margin-top: 30px;
  padding: 15px;
}
</style>