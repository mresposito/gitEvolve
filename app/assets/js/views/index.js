define ([
  "jquery",
  "underscore",
  "backbone",
  "models/Repo"
], function($, _, Backbone, Repo) {

  return Backbone.View.extend({

    events: {
      "change .username": "loadUser",
      "click .repo": "loadRepoName"
    },

    initialize: function() {
    },

    loadUser:  function(event) {
      var self = this;
      var username = $(event.target).val()

      this.model.setUsername(username, function(isValid) {
        if(data) {
          self.loadRepo()
        } else {
          // show user error
          console.log("failed :(")
        }
      })
    },

    loadRepoName:  function(event) {
      var self = this;
      var repo = $(event.target).val()

      this.model.setRepo(repo, function(validUser, validRepo) {
        if(validUser && validRepo) {
          console.log("everythin good!")
        } else if (validUser) {
          // repo is invalid
        } else {
          // have to set valid username
        }
      }
    },

    loadRepo: function() {
      var self = this
      var repo = this.model.connect(this.username, this.repo)

      repo.show(function(err, repo) {
        console.log("ieht")
        if(err == null) {
          self.showRepo()
        } else {
          self.doestExist()
        }
      })
    },

    showRepo: function() {
      // hide errors
      $(this.el).find("input").css("border", "none")
      $(this.el).find(".alert").hide()
      // load repo info
    },

    doestExist: function() {
      $(this.el).find("input").css("border", "2px solid red")
      $(this.el).find(".alert").show()
    }
  });
});
