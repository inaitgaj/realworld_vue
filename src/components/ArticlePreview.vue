<template>
  <div class="article-preview">
      <div class="article-meta">
        <router-link :to="{ name: 'profile', params: {} }">
          <img :src="article.author.image" />
        </router-link>
        <div class="info">
          <router-link class="author" :to="`profile/${article.author.username}`">{{article.author.username}}</router-link>
          <span class="date">{{formatDate(article.createdAt)}}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
          <i v-bind:class="{'ion-heart' : article.favourited}"></i> {{article.favoritesCount}}
        </button>
      </div>
      <router-link  class="preview-link" :to="`article/${article.slug}`">
        <h1>{{article.title}}</h1>
        <p>{{article.description}}</p>
        <span>Read more...</span>
      </router-link>
    </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    article: Object
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do, YYYY");
    }
  }
};
</script>
