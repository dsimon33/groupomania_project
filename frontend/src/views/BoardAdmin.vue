<template>
  <div class="containerBA">
    <header class="jumbotron">
      <div class="navbar-nav mr-auto">
        <button class="nav-item menu">
          <router-link to="/posts" class="nav-link textMenu">Publications</router-link>
        </button>
        <button class="nav-item menu">
          <router-link to="/posts/report" class="nav-link textMenu"
            >Publications signalées</router-link
          >
        </button>
        <button class="nav-item menu">
          <router-link to="/add" class="nav-link textMenu">Ajouter une publication</router-link>
        </button>
        <button class="nav-item menu">
          <router-link to="/users" class="nav-link textMenu"
            >Utilisateurs</router-link
          >
        </button>
      </div>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "User",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>  

<style lang="scss">

.jumbotron {
  background:none;
  height: 900px
}

.menu {

  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 350px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  background: linear-gradient(rgb(47, 124, 255), skyblue);
  box-shadow: 15px 12px skyblue;
  border: 2px oustet #c0c0c0;
  :hover {
    background-color:skyblue;
  }
}
</style>
 
 