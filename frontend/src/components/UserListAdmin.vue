<template>
  <div class="containerULA">
    <div>
    <div v-if="users && user.roles[0] == role" class="edit-form">
      <div class="col-md-auto">
      <div class="input-group mb-3 search">
        <input
          type="text"
          class="form-control"
          placeholder="Rechercher un utilisateur par son pseudo"
          v-model="username"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary search_Btn"
            type="button"
            @click="searchUser"
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>
      <div class="col-md-12">
        <h1>Liste des utilisateurs</h1>
        <div class="card cardUser">
          <div
            class="card-body user"
            :class="{ active: index == currentIndex }"
            v-for="(user, index) in users"
            :key="index"
            @click="setActiveUser(user, index)"
          >
            <h2 class="card-title">{{ user.username }}</h2>
            <p class="userDate">
              Utilisateur crée le {{ user.createdAt }}
            </p>
            <p class="card-texte descriptionUser" style="white-space: pre-line;">{{ user.introduction }}</p>
            <p class="card-texte text-center">{{ user.email }}</p>
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
      role: "ROLE_ADMINISTRATEUR",
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
  

.cardUser {
  align-items: center;
  margin: auto;
  padding: 0px;
  background :transparent;
  border-style : none;
  max-width: 100%;
  width: 85%;

}

.user {
    align-items: center;
    min-width: 100%;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    background: linear-gradient(rgb(47, 124, 255), skyblue);
    border-style: double;

}

.descriptionUser {
      border-style: double;
      border-color: dark;
      background-color: white;
      text-align: center;
      font-size: 18px;
      min-height: 80px;


}


.userDate {
      font-size: 8px;
      text-align: center;
}


.search__Btn {
  background-color: skyblue;
  
}

.search__Btn:hover {
    background-color: rgb(47,124,255);
  }
</style>>
