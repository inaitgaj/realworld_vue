<template lang="html">
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form>
          <fieldset>
              <fieldset class="form-group">
                <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
              </fieldset>
              <fieldset class="form-group">
                <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
              </fieldset>
              <fieldset class="form-group">
                <textarea v-model="user.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <label class="form-control form-control-lg">{{user.email}}</label>
              </fieldset>
              <fieldset class="form-group">
                <input v-model="newPassword" class="form-control form-control-lg" type="password" placeholder="Password">
              </fieldset>
              <button @click="update()" class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr>
        <button @click="logout" class="btn btn-outline-danger">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>
<script>
export default {
  data: function() {
    return {
      user: null,
      newPassword: ""
    };
  },
  created() {
    this.user = this.$store.state.users.user;
  },
  methods: {
    logout() {
      this.$store.dispatch("users/logoutUser");
      this.$router.replace({ name: "home" });
    },
    update() {
      if (this.newPassword) {
        this.user.password = this.newPassword;
      }

      this.$store.dispatch("users/updateUser", this.user);
    }
  }
};
</script>
