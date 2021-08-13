<template>
  <div>
    <div v-if="currentUser && user.roles[0] == role" class="edit-form">
      <h4>Utilisateur</h4>
      <div class="card-body text-center bg-light">
        <h1 class="card-title">{{ currentUser.username }}</h1>
        <p class="card-texte">{{ currentUser.email }}</p>
        <p class="card-texte">{{ currentUser.introduction }}</p>
        <strong>Authorities:</strong>
        <ul>
          <li v-for="(role, index) in currentUser.roles" :key="index">
            {{ role }}
          </li>
        </ul>
        
      </div>
      
      
      <button class="badge badge-danger mr-2" @click="deleteUser">
        Supprimer
      </button>

    </div>
    
    <div v-else>
      <div class="card-body text-center bg-light">
        <h1 class="card-title">{{ currentUser.username }}</h1>
        <p class="card-texte">{{ currentUser.email }}</p>
        <p class="card-texte">{{ currentUser.introduction }}</p>
        <strong>Authorities:</strong>
        <ul>
          <li v-for="(role, index) in currentUser.roles" :key="index">
            {{ role }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "user",
  data() {
    return {
      currentUser: "",
      currentIndex: -1,
      role: "ROLE_ADMIN",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    getUser(id) {
      UserService.get(id)
        .then((response) => {
          this.currentUser = response.data.data;
          console.log(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteUser() {
      UserService.delete(this.currentUser.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "users" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>