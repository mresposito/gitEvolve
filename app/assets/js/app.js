require.config({
  paths: {
    jquery: "/assets/js/jquery-1.9.0.min",
    ui: "/assets/js/jquery-ui-1.10.3.custom.min",
    underscore: "/assets/js/underscore-min",
    backbone: "/assets/js/backbone-min",
    github: "/assets/js/github"
  },
  shim: {
    jquery: {
      exports: "$"
    },
    ui: {
      exports: "UI",
      deps: ["jquery"]
    },
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["underscore"],
      exports: "Backbone"
    },
    github: {
      exports: "Github"
    }
  }
});

require ([
  "jquery",
  "underscore",
  "backbone",
  "views/index",
  "models/Repo"
], function($, _, Backbone, Index, Repo) {
  // index login logic
  new Index({
    el: $("#bodyWrap"),
    model: new Repo()
  });
});
