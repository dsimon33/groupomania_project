<template>
  <div>
    <div v-if="currentUser && user.roles[0] == role" class="edit-form">
      <div class="vide"></div>
      <div class="card-body text-center cardUser">
        <h1 class="card-title">{{ currentUser.username }}</h1>
        <p class="card-texte">{{ currentUser.email }}</p>
        <form>
        <div class="form-group">
          <label for="title">Présentation</label>
          <input
            type="text"
            class="form-control descriptionUser"
            id="presentation"
            v-model="currentUser.introduction"
          />
        </div>
        </form>
        <h2>Accés autorisé:</h2>
        <p> {{ currentUser.roles[0].name }}</p>
        
      </div>
      <div class="vide"></div>
      <div class="text-center">
      <button class="badge badge-danger mr-2" @click="deleteUser">
        Supprimer
      </button>
      
      <button type="submit" class="badge badge-success" @click="updateIntroduction">
        Modifier
      </button>
      </div>
      <div class="vide"></div>
    </div>
    
    <div v-else>
      <div class="card-body text-center">
        <h1 class="card-title">{{ currentUser.username }}</h1>
        <p class="card-texte">{{ currentUser.email }}</p>
        <p class="card-texte descriptionUser" style="white-space: pre-line;">{{ user.introduction }}</p>
        <h2>Accés autorisé:</h2>
        <p v-for="(role,index) in currentUser.roles" :key="index">{{role}}</p>
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
      role: "ROLE_ADMINISTRATEUR",
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

    updateIntroduction() {
      UserService.update(this.currentUser.id, this.currentUser.introduction)
        .then(res => res.data) 
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
.cardUser {
background: linear-gradient(rgb(47, 124, 255), skyblue);
}

.vide {
  height: 20px;
}

.descriptionUser {
      border-style: double;
      border-color: dark;
      background-color: white;
      text-align: center;
      font-size: 18px;
      min-height: 80px;
}
</style>