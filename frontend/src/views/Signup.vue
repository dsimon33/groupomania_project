<template>
  <div class="signup">
    <form class="form-signin" @submit.prevent="signup">
      <img
        class="mb-4"
        src="../assets/icon.svg"
        alt=""
        width="80"
        height="80"
      />
      <h1 class="h3 mb-3 font-weight-normal">
        Créez vos identifiants de connexion
      </h1>
      <label for="inputPseudo" class="sr-only">Votre Pseudo</label>
      <input
        type="text"
        id="inputPseudo"
        class="form-control"
        placeholder="Pseudo"
        required=""
        autofocus=""
      />
      <label for="inputPassword" class="sr-only">Votre mot de passe</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Mot de passe"
        required=""
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Me créer
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  methods: {
    signup(){
      console.log('signup')
    }
  }
}
</script>

<style lang="scss">
.form-signin {
  margin-left: 40px;
  margin-right: 40px;
}

input, .btn {
  margin-top: 5px;
  margin-bottom: 15px;
}


</style>
