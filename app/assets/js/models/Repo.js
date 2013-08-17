define ([
  "underscore",
  "backbone"
], function(_, Backbone) {

  return Backbone.Model.extend({
    defaults: {
      options: {}
    },

    initialize: function() {
      this.github = new Github({})
    },

    connect: function(user, repo) {
      this.repo = this.github.getRepo(user, repo)
      return this.repo
    }

  });
});
