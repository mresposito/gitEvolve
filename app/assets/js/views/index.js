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
      this.username = null;
      this.repo = null;
    },

    loadUser:  function(event) {
      this.username = $(event.target).val()

      if(this.repo != null) {
        this.loadRepo()
      }
    },

    loadRepoName:  function(event) {
      this.repo = $(event.target).val()

      if(this.username != null) {
        this.loadRepo()
      }
    },

    loadRepo: function() {
      var self = this
      var repo = this.model.connect(this.username, this.repo)

      repo.show(function(err, repo) {
        console.log(err)
        if(err == null) {
          self.showRepo()
        } else {
          self.doestExist()
        }
      })
    },

    showRepo: function() {
      $(this.el).find("input").css("border", "none")
      $(this.el).find(".alert").hide()
    },

    doestExist: function() {
      $(this.el).find("input").css("border", "2px solid red")
      $(this.el).find(".alert").show()
    }
  });
});
