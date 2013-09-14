define ([
  "jquery",
  "ui",
  "underscore",
  "backbone",
  "models/Repo"
], function($, UI, _, Backbone, Repo) {

  return Backbone.View.extend({

    events: {
      "change .username": "loadRepo",
      "change .repo": "loadRepo"
    },

    initialize: function() {
      // TODO: remove for ease of test
      $(this.el).find(".username").val("mresposito")
      $(this.el).find(".repo").val("myCV")

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
          self.showRepoInfo(commits);
          self.showCommit(commits[0].commit);
        } else {
          console.log("no commits :(");
        }
      });
    },

    showRepoInfo: function(commits) {
      var $canvas = $(this.el).find(".canvas");
      $canvas.show();
      $canvas.find(".numberCommits b").text(commits.length);
      $canvas.find(".slider").slider();
    },

    showCommit: function(commit) {
      var $canvas = $(this.el).find(".canvas");
      // load info
      $canvas.find(".currentCommit b").text(commit.author.name);
      $canvas.find(".currentCommit span").text(commit.message);
    }
  });
});
