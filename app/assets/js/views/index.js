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
        if(isValid) {
          self.hideUserNameError()
          self.loadRepo()
        } else {
          // show user error
          self.showUserNameError()
        }
      })
    },

    loadRepoName:  function(event) {
      var self = this;
      var repo = $(event.target).val()

      this.model.setRepo(repo, function(validUser, validRepo) {
        if(validUser && validRepo) {
          self.loadRepo()
        } else if (validUser) {
          // repo is invalid
          console.log("invalid repo")
        } else {
          // have to set valid username
          console.log("itnsoahe")
        }
      })
    },

    loadRepo: function() {
      var self = this
      this.model.connect(function(success) {
        if(success) {
          self.showRepo()
        } else {
          console.log("could not connect")
        }
      })
    },

    showUserNameError: function() {
      $(this.el).find(".userError").show()
      $(this.el).find("input.username").css("border", "2px solid red")
    },

    hideUserNameError: function() {
      $(this.el).find(".userError").hide()
      $(this.el).find("input.username").css("border", "none")
    },

    showRepo: function() {
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
