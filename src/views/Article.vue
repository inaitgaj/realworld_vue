<template>
  <div class="article-page">

  <div class="banner">
    <div v-if="article" class="container">

      <h1>{{article.title}}</h1>

      <div class="article-meta">
          <router-link :to="{ name: 'profile', params: {} }">
            <img :src="article.author.image" />
          </router-link>
        <div class="info">
          <router-link class="author" :to="`profile/${article.author.username}`">{{article.author.username}}</router-link>
          <span class="date">{{formatDate(article.createdAt)}}</span>
        </div>
        <button v-show="article.author.username === username" @click="edit" class="btn btn-sm btn-outline-secondary">
          <i class="ion-edit"></i>

           Edit Article
        </button>
        &nbsp;
        <button v-show="article.author.username === username" @click="remove" class="btn btn-outline-danger btn-sm">
          <i class="ion-trash-a"></i>

           Delete Article
        </button>
        &nbsp;
        <button v-show="article.author.username !== username" @click= "follow" class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow {{article.author.username}}
        </button>
        &nbsp;
        <button v-show="article.author.username !== username" class="btn btn-sm btn-outline-primary" :class="{active : article.favourited}">
          <i class="ion-heart"></i>
          &nbsp;
          Favorite Post <span class="counter">({{article.favoritesCount}})</span>
        </button>
      </div>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12">
        <p>
        {{article.body}}
        </p>
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <div class="article-meta">
        <router-link :to="{ name: 'profile', params: {} }">
          <img :src="article.author.image" />
        </router-link>
        <div class="info">
        <router-link :to="{ name: 'profile', params: {} }" class="author">{{article.author.username}}</router-link>
          <span class="date">{{formatDate(article.createdAt)}}</span>
        </div>


        <button v-show="article.author.username === username" @click="edit" class="btn btn-sm btn-outline-secondary">
          <i class="ion-edit"></i>

           Edit Article
        </button>
        &nbsp;
        <button v-show="article.author.username === username" @click="remove" class="btn btn-outline-danger btn-sm">
          <i class="ion-trash-a"></i>

           Delete Article
        </button>
        <button v-show="article.author.username !== username" @click= "follow" class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow {{article.author.username}}
        </button>
        &nbsp;
        <button v-show="article.author.username !== username" class="btn btn-sm btn-outline-primary" :class="{active : article.favourited}">
          <i class="ion-heart"></i>
          &nbsp;
          Favorite Post <span class="counter">({{article.favoritesCount}})</span>
        </button>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <form class="card comment-form">
          <div class="card-block">
            <textarea v-model="newComment" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img :src="user.image" class="comment-author-img" />
            <button @click = "postComment" class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>

        <div v-for="(comment,key,index) in comments" :key="index" class="card">
          <div class="card-block">
            <p class="card-text">{{comment.body}}</p>
          </div>
          <div class="card-footer">
            <a href="" class="comment-author">
              <img :src="comment.author.image" class="comment-author-img" />
            </a>
            &nbsp;
            <a href="" class="comment-author">{{comment.author.username}}</a>
            <span class="date-posted">{{formatDate(comment.createdAt)}}</span>
          </div>
        </div>


      </div>

    </div>

  </div>

</div>
</template>
<script>
import moment from "moment";
export default {
  data: function() {
    return {
      article: null,
      newComment: ""
    };
  },
  methods: {
    formatDate(dateString) {
      return moment(dateString).format("MMMM Do");
    },
    follow() {
      //TODO
    },
    edit() {
      //TODO - add path variable
      this.$router.push(
        { name: "editor_existing" },
        { params: { articleslug: this.article.slug } }
      );
    },
    remove() {
      this.$store.dispatch("articles/removeArticle", this.article.slug);
      this.$router.push({ name: "home" });
    },
    postComment() {
      this.$store.dispatch("articles/postComment", {
        comment: this.newComment,
        slug: this.article.slug
      });
      this.newComment = "";
      this.fetchComments();
    },
    fetchComments() {
      this.$store.dispatch("articles/getComments", {
        slug: this.$route.params.articleslug
      });
    }
  },
  computed: {
    // article() {
    //   return this.$store.state.articles.article  ;
    // },
    comments() {
      return this.$store.state.articles.comments;
    },
    username() {
      return this.$store.getters["users/username"];
    },
    user() {
      return this.$store.state.users.user;
    }
  },
  created() {
    this.$store
      .dispatch("articles/getCurrentArticle", {
        slug: this.$route.params.articleslug
      })
      .then(() => {
        this.article = this.$store.state.articles.article;
      });
    this.fetchComments();
  }
};
</script>
