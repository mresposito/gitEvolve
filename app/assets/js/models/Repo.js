define ([
  "jquery",
  "underscore",
  "backbone"
], function($, _, Backbone) {

  var githubBase = "https://api.github.com/"

  return Backbone.Model.extend({
    defaults: {
      options: {}
    },

    initialize: function() {
      this.github = new Github({})
      this.validUser = false;
      this.validRepo = false;
      this.repoNames = null
    },

    connect: function(user, repo) {
      this.repo = this.github.getRepo(user, repo)
      return this.repo
    },

    /**
     * returns true if the username exists
     * starts loading the repositories of the user
     */
    setUsername: function(username, callback) {
      var self = this;
      this.username = username;
      var requestURL = githubBase + "users/" + username

      $.getJSON(requestURL, function(data) {
        self.loadRespoNamesFormUsers(data.repos)
        self.validUser = true;
        callback(true)
      })
      .fail(function() { 
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

    loadRespoNamesFormUsers: function(reposUrl) {
      var self = this;

      $.getJSON(reposUrl, function(data) {
        self.repoNames = _.map(data, function(repo) {
          return repo.name
        })
      })
      .fail(function() { self.repoNames = null }
    }

  });
});
