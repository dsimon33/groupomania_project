<template>
  <div class="containerProfile">
      <h3>
        Présentation : <strong>{{currentUser.introduction}}</strong>
      </h3>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>
  </div>
  
</template>

<script>
export default {
  name: 'Profile',

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>

<style lang="scss">
.containerProfile {
  background: linear-gradient(rgb(47, 124, 255), skyblue);
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0px;
  display:flex;
  flex-direction: column;
  align-items: center;
  
}
</style>