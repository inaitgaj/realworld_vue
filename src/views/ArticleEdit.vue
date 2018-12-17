<template lang="html">
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          Edit

          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input v-model="article.title" type="text" class="form-control form-control-lg" placeholder="Article Title">
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="article.description" type="text" class="form-control" placeholder="What's this article about?">
              </fieldset>
              <fieldset class="form-group">
                  <textarea v-model="article.body" class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input v-model="tags" type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
              </fieldset>
              <button @click ="editArticle" class="btn btn-lg pull-xs-right btn-primary" type="button">
                  Update Article
              </button>
            </fieldset>
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
      article: {},
      tags: ""
    };
  },
  methods: {
    editArticle() {
      this.article.tagList = this.tags.split(" ");
      this.$store.dispatch("articles/updateArticle", this.article).then(() => {
        this.$router.push({ path: "/article/" + this.article.slug });
      });
    }
  },

  created() {
    this.$store
      .dispatch("articles/getCurrentArticle", {
        slug: this.$route.params.articleslug
      })
      .then(() => {
        var responseArticle = this.$store.state.articles.article;
        this.article.title = responseArticle.title;
        this.article.description = responseArticle.description;
        this.article.body = responseArticle.body;
        this.article.slug = responseArticle.slug;
        this.tags = responseArticle.tagList.join(" ");
      });
  }
};
</script>
