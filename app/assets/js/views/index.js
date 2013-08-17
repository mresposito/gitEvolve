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
      this.local = true;
    },

    loadUser:  function(event) {
      this.username = $(event.target).val()
      this.loadRepo()
    },

    loadRepoName:  function(event) {
      this.repo = $(event.target).val()
      this.loadRepo()
    },

    loadRepo: function() {
      var self = this

      var repo = this.model.connect(this.username, this.repo)
      repo.show(function(err, repo) {
        console.log(err)
        if(err == null) {
          self.showRepo()
        } else if(self.repo && self.username) {
          self.doestExist()
        }
      })
    },

    showRepo: function() {
      $(this.el).find("input").css("border", "none")
    },

    doestExist: function() {
      $(this.el).find("input").css("border", "2px solid red")
    }
  });
});
