<template>
  <div class="container">
    <div>
    <div v-if="users && user.roles[0] == role" class="edit-form">
      <div class="col-md-auto">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Rechercher un utilsateur par son pseudo"
          v-model="username"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchUser"
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
      <div class="col-md-12 text-center">
        <h4>liste des utilisateurs</h4>
        <div class="card bg-dark">
          <div
            class="card-body text-center bg-light"
            :class="{ active: index == currentIndex }"
            v-for="(user, index) in users"
            :key="index"
            @click="setActiveUser(user, index)"
          >
            <h1 class="card-title">{{ user.username }}</h1>
            <p class="card-texte">{{ user.email }}</p>
            <p class="publicationDate">
              Utilisateur crée le {{ user.createdAt }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Vous nêtes pas autorisés à accéder à cette page</p>
    </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "users-list",
  data() {
    return {
      users: [],
      currentUser: null,
      currentIndex: -1,
      username: this.username,
      role: "ROLE_ADMIN",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  methods: {
    retrieveUsers() {
      UserService.getAllUsers()
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
      this.currentUser = null;
      this.currentIndex = -1;
    },

    setActiveUser(user, index) {
      this.currentUser = user;
      this.currentIndex = index;
      console.log(this.currentUser.id)
      this.$router.push("/users/" + this.currentUser.id);
    },

    searchUser() {
      UserService.findByUser(this.username)
        .then((response) => {
          this.users = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveUsers();
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
