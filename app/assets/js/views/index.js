define ([
  "jquery",
  "underscore",
  "backbone",
  "models/Repo"
], function($, _, Backbone, Repo) {

  return Backbone.View.extend({

    events: {
      "change .username": "loadRepo",
      "change .repo": "loadRepo"
    },

    initialize: function() {
      this.loadRepo(); // check if user has reloaded the page
    },

    loadRepo: function () {
      var self = this;
      this.username = $(this.el).find(".username").val()
      this.repo = $(this.el).find(".repo").val()

      if(this.username && this.repo) {
        // load from the model
        this.model.setRepo(this.username, this.repo, function(success) {
          if(success) {
            self.hideRepoError()
            self.showRepo()
          } else {
            self.showRepoError()
          }
        });
      }
    },

    showRepoError: function() {
      $(this.el).find(".repoError").show()
      $(this.el).find(".formBar input").css("border", "2px solid red")
    },

    hideRepoError: function () {
      $(this.el).find(".repoError").hide()
      $(this.el).find(".formBar input").css("border", "none")
    },

    showRepo: function() {
      var self = this;
      this.model.getCommits(function(commits) {
        if(commits) {
          console.log("commits!")
          self.showCommit(commits[0])
        } else {
          console.log("no commits :(");
        }
      });
    },

    showCommit: function(sha) {
      // TODO
    }
  });
});
