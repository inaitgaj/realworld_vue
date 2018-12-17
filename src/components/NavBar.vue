<template>
  <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <router-link class="nav-link active" :to="{ name: 'home', params: {} }">Home</router-link>
          </li>

          <li v-if="username" class="nav-item">
            <router-link class="nav-link" to="/editor">
              <i class="ion-compose"></i>&nbsp;New Post
            </router-link>
          </li>
          <li v-if="username" class="nav-item">
            <router-link class="nav-link" to="/settings">
              <i  class="ion-gear-a"></i>&nbsp;Settings
            </router-link>
          </li>
          <li v-if="username" class="nav-item">
            <router-link class="nav-link" :to="`/profile/${username}`">
              {{username}}
            </router-link>
          </li>
          <li v-if="username == null" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login', params: {} }"><i class="ion-compose"></i> Sign in</router-link>
          </li>
          <li v-if="username == null" class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register', params: {} }"><i class="ion-compose"></i> Sign up</router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
export default {
  computed: {
    username() {
      return this.$store.getters["users/username"];
    }
  },
  created() {
    this.$store.dispatch("users/getUser");
  }
};
</script>
