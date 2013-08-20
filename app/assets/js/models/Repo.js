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

    /**
     * returns true if the username exists
     * starts loading the repositories of the user
     */
    setUsername: function(username, callback) {
      var self = this;
      this.username = username;
      var requestURL = this.userUrl(username)

      $.getJSON(requestURL, function(data) {
        self.loadRepoNamesFormUsers(data.repos)
        self.validUser = true;
        callback(true)
      })
      .fail(function(err) { 
        console.log(JSON.stringify(err))
        self.validUser = false;
        callback(false) 
      })
    },

    setRepo: function(repo, callback) {
      var self = this;
      this.repo = repo;

      if(this.validUser && this.repoNames != null) {
        var result = _.find(this.repoNames, function (name) {
          return name === repo;
        })
        callback(true, result != undefined)
      }
      // if(repoNames != null) {
      // }
      
    },

    loadRepoNamesFormUsers: function(reposUrl) {
      var self = this;

      $.getJSON(reposUrl, function(data) {
        self.repoNames = _.map(data, function(repo) {
          return repo.name
        })
      })
      .fail(function() { self.repoNames = null })
    }

  });
});
