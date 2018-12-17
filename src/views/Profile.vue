<template lang="html">
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>
            {{profile.bio}}
          </p>
          <button class="btn btn-sm btn-outline-secondary action-btn">
            <i class="ion-plus-round"></i>
            &nbsp;
            Follow {{profile.username}}
          </button>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link active" href="">My Articles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Favorited Articles</a>
            </li>
          </ul>
        </div>

        <ArticlePreview v-for="article in globalArticles" :key="article.slug" :article="article">

        </ArticlePreview>


      </div>

    </div>
  </div>

</div>
</template>

<script>
import ArticlePreview from "@/components/ArticlePreview.vue";
export default {
  components: {
    ArticlePreview
  },
  data: function() {
    return {
      activeFeed: "",
      filters: {
        page: 1
      }
    };
  },
  methods: {
    setFeed(feedType) {
      //dispatches action to users module, loginUser action
      this.activeFeed = feedType;
      if (feedType == "profile") {
        this.$store.dispatch("articles/getProfileFeed", this.filters);
      } else if (feedType == "favourites") {
        this.$store.dispatch("articles/getProfileFeed", this.filters);
      }
    }
  },
  created() {
    this.$store.dispatch("users/getProfile", this.$route.params.username);
  },
  computed: {
    profile() {
      return this.$store.state.users.profile;
    },
    globalArticles() {
      return this.$store.state.articles.feed || [];
    }
  }
};
</script>
