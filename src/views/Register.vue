<template >
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign up</h1>
        <p class="text-xs-center">
          <router-link :to="{ name: 'login', params: {} }"> Have an account?</router-link>
        </p>

        <ul class="error-messages">
          <li v-for="(error, key, index) in errors" :key="index">{{error}}</li>
        </ul>

        <form>
          <fieldset class="form-group">
            <input v-model="username" class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="email" class="form-control form-control-lg" type="text" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button @click="signup" class="btn btn-lg btn-primary pull-xs-right">
            Sign up
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      password: "",
      email: "",
      username: "",
      errors: []
    };
  },
  methods: {
    signup() {
      //dispatches action to users module, loginUser action
      this.errors = [];
      this.$store
        .dispatch("users/createUser", {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(() => {
          this.errors = [];
          //redirect to Home
          this.$router.replace({ name: "home" });
        })
        .catch(err => {
          var errors = err.response.data.errors;
          if (errors) {
            for (var prop in errors) {
              this.errors.push("" + prop + " " + errors[prop]);
            }
          } else {
            this.errors.push(err);
          }
        });
    }
  }
};
</script>
