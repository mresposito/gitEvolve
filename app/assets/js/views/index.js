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
            self.loadRepoView()
          } else {
            self.showRepoError()
          }
        });
      } else {
        // has not filled the data
        console.log("invalid")
      }
    },

    loadRepoView: function() {
      this.repoView = new RepoView({
        model: this.model,
        el: $(this.el).find(".repoContainer")
      })
      this.model.connect(function(success) {
        if(success) {
          self.showRepo()
        } else {
          console.log("could not connect")
        }
      })
    },

    showRepoError: function() {
      this.showInputError(".repoError", "repo") 
    },

    showUserNameError: function() {
      this.showInputError(".userError", "username")
    },

    showInputError: function(tag, type) {
      $(this.el).find(tag).show()
      $(this.el).find("input." + type).css("border", "2px solid red")
    },

    hideRepoError: function () {
      this.hideInputError(".repoError", "repo")
    },

    hideUserNameError: function() {
      this.hideInputError(".userError", "username")
    },

    hideInputError: function(tag, type) {
      $(this.el).find(tag).hide()
      $(this.el).find("input." + type).css("border", "none")
    },

    showRepo: function() {
      // load repo info
    }
  });
});
