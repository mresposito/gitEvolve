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
      this.branch = "master"; // TODO: make user load branches
    },

    connect: function(callback) {
      this.repo = this.github.getRepo(this.username, this.repo)
      return this.repo !== null
    },

    setRepo: function(username, repo, callback) {
      var self = this;
      this.baseURL = githubBase + "repos/" + username + "/" + repo;
      this.repo = repo;
      this.username = username;

      // try to fetch the repo
      $.getJSON(this.baseURL, function(data) {
        self.validRepo = true
        callback(true)
        self.connect(); // TODO: one call for connecting
      })
      .fail(function(err) { 
        self.validRepo = false;
        callback(false) 
      })
    },

    getCommits: function(callback) {
      var requestURL = this.baseURL + "/commits";
      console.log(requestURL)
      $.getJSON(requestURL, callback)
        .fail(function(err) {
          console.log("booh")
        });
    }
  });
});
