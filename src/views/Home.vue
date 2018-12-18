<template lang="html">
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link"
                  v-if="username"
                  @click = "changeFeedType('user')"
                  :class="{active : activeFeed == 'user'}">
                  Your Feed
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link"

                @click = "changeFeedType('global')"
                :class="{active : activeFeed == 'global'}">
                Global Feed
              </a>
              </li>
            </ul>
          </div>


          <ArticlePreview v-show="countPages > 0" v-for="article in globalArticles" :key="article.slug" :article="article">

          </ArticlePreview>
          <div class="article-preview" v-show="countPages == 0"> No articles are here... yet. </div>
          <div>
            <ul class="pagination">
              <li
                v-for="page in countPages"
                :key="page"
                class="page-item"
                :class="{active : filters.page == page}"
                @click.prevent="changePage(page)">
                <a class="page-link" href v-text="page" />
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div  class="tag-list">
              <a href=""
              v-for="(tag,index) in tags" :key="index"
              @click.prevent="changeTag(tag)"
              class="tag-pill tag-default"
              :class="{active : filters.tag == tag}">
              {{tag}}</a>

            </div>
          </div>
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
      activeFeed: "global",
      filters: {
        page: 1
      },
      tags: []
    };
  },
  methods: {
    setFeed() {
      //dispatches action to users module, loginUser action
      var feedType = this.activeFeed;

      if (feedType == "global") {
        this.$store.dispatch("articles/getGlobalFeed", this.filters);
      } else if (feedType == "user") {
        this.$store.dispatch("articles/getUserFeed", this.filters);
      }
    },
    getTags() {
      this.$store.dispatch("articles/getTags").then(response => {
        this.tags = response.data.tags;
      });
    },
    changeFeedType(feedType) {
      this.activeFeed = feedType;
      this.setFeed();
      this.filters.tag = "";
    },
    changeTag(tag) {
      this.filters.tag = tag;
      this.setFeed();
    },
    changePage(page) {
      this.filters.page = page;
      this.setFeed(this.activeFeed);
    }
  },
  created() {
    this.setFeed();
    this.getTags();
  },
  computed: {
    globalArticles() {
      return this.$store.state.articles.feed || [];
    },
    username() {
      return this.$store.getters["users/username"];
    },
    countPages() {
      return Math.ceil(this.$store.state.articles.count / 10);
    }
  }
};
</script>
