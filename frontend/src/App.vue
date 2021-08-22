<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navigation" id="nav">
      <a href class="navbar-brand" @click.prevent><img class="logo" src ="./assets/icon-left-font-monochrome-white.svg" alt="logo groupomania" /> </a>
      <div class="navbar-nav mr-auto">
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Administrateur</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item HeaderMenu">
          <router-link v-if="showUserBoard" to="/user" class="nav-link">Utilisateur</router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />S'enregistrer
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Se connecter
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link textrMenu" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />Se déconnecter
          </a>
        </li>
      </div>
    </nav>
    <div class="retourNav">
      <a href="#nav" class="retourNavIco"><font-awesome-icon icon="home" /></a>
    </div>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name:"app",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMINISTRATEUR');
      }

      return false;
    },
    showUserBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_UTILISATEUR');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATEUR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss">
img.logo {
  width: 50%;
  height: 50%;
}

.navigation {
  background-color: skyblue;
}

.retourNav {
  position: fixed;
  left : 0px;
  top: 50%;
  width: 20px;
  background-color: white;
  border-radius: 0px 30px 30px 0px;

  

}

.container {
  background-image: url("./assets/iconminimodif.png");
  background-repeat: repeat;
  padding: 0px;
}

#app {
  height: auto;
  
}

</style>