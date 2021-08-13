<template>
  <div class="containerBU">
    <header>
      <div class="navbar-nav mr-auto">
        <button class="nav-item menu">
          <router-link to="/posts" class="nav-link menu__Btn">Voir les posts</router-link>
        </button>
        <button class="nav-item menu">
          <router-link to="/add" class="nav-link menu__Btn">Ajouter un post</router-link>
        </button>
      </div>
    </header>
  </div>
</template>


<style lang="scss">
.containerBU {
  background: linear-gradient(rgb(47, 124, 255), skyblue);
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  margin: 0px;
}



.menu {

  margin-top: 20px;
  margin-bottom: 20px;
  
  }
  .menu__Btn {
    background: white;
    border: 2px solid rgb(47, 124, 255);
}

.menu__Btn:hover {
    background:skyblue;
  }
</style>