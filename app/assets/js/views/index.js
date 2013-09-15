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
      "change .repo": "loadRepo",
      "click .controlAction" : "mediaControl"
    },

    initialize: function() {
      // TODO: remove for ease of test
      $(this.el).find(".username").val("mresposito")
      $(this.el).find(".repo").val("gitEvolve")

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
          self. commits = commits.reverse();
          self.showRepoInfo(commits);
          self.showCommit(0);
        } else {
          console.log("no commits :(");
        }
      });
    },

    showRepoInfo: function(commits) {
      var self = this;

      var $canvas = $(this.el).find(".canvas");
      $canvas.show();
      $canvas.find(".numberCommits b").text(commits.length);
      var $slider = $canvas.find(".slider");
      $slider.slider({
        min: 0,
        max: commits.length - 1,
        step: 1,
        change: function(index) {
          var index = $slider.slider("value");
          self.showCommit(index);
        }
      });
    },

    showCommit: function(index) {
      var self = this;

      var commit = this.commits[index].commit;
      var $canvas = $(this.el).find(".canvas");
      // load info
      $canvas.find(".currentCommit b").text(commit.author.name);
      $canvas.find(".currentCommit .message").text(commit.message);
      $canvas.find(".currentCommit .numberCommits").text(index + 1);

      $.getJSON(commit.tree.url, function(json) {
        self.displayTree(json);
      });
    },

    displayTree: function(json) {
      var self = this,
        $container = $(this.el).find(".treeCanvas");
      $container.html("");

      _.each(json.tree, function(item) {
        self.displayObject(item, $container);
      });
    },

    displayObject: function(item, $container) {
      var icon = "folder-close";
      if(item.type === "blob") {
        icon = "file-text";
      }
      $container.prepend(
        _.template('<div class="object"><i class="icon-<%= icon %>"></i><a href="#"><%= path %><span></span></a></div>',
          {path: item.path, icon: icon}));
    },

    mediaControl: function(event) {
      var $target = $(event.target);
      var $slider = $(this.el).find(".slider");

      if($target.hasClass("icon-fast-forward")) {
        // go to 0
      } else if($target.hasClass("icon-fast-backward")) {
        // go to the end
      } else if($target.hasClass("icon-play")) {
        $(this.el).find(".icon-pause").show();
        $(this.el).find(".icon-play").hide();
        // start animation
      } else {
        $(this.el).find(".icon-play").show();
        $(this.el).find(".icon-pause").hide();
      }
    }
  });
});
