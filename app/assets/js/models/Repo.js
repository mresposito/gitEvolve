define ([
  "jquery",
  "underscore",
  "backbone",
  "github"
], function($, _, Backbone, Github) {

  var githubBase = "https://api.github.com/"

  return Backbone.Model.extend({
    defaults: {
      options: {}
    },

    userUrl: function(username) {
      return githubBase + "users/" + username
    },

    initialize: function() {
      this.github = new Github({})
      this.validUser = false;
      this.validRepo = false;
      this.repoNames = null
    },

    connect: function(callback) {
      this.repo = this.github.getRepo(this.username, this.repo)
      return this.repo !== null
    },

    setRepo: function(username, repo, callback) {
      var self = this;
      var requestURL = githubBase + "repos/" + username + "/" + repo;
      this.repo = repo;
      this.username = username;

      // try to fetch the repo
      $.getJSON(requestURL, function(data) {
        self.validRepo = true
        callback(true)
      })
      .fail(function(err) { 
        self.validRepo = false;
        callback(false) 
      })
    }
  });
});
