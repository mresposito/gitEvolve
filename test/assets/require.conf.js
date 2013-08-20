require.config({
  baseUrl: EnvJasmine.rootDir,
  paths: {
    mocks:      EnvJasmine.mocksDir,
    specs:      EnvJasmine.specsDir,

    // Libraries
    jquery: EnvJasmine.libDir + "jquery-1.9.0.min",
    underscore: EnvJasmine.libDir + "underscore-min",
    backbone: EnvJasmine.libDir + "backbone-min",
    github: EnvJasmine.libDir + "github",
    mockjax: EnvJasmine.libDir + "jquery.mockjax",
  },
  shim: {
    jquery: {
      exports: "$"
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
    },
    mockjax: {
      deps: ["jquery"],
      exports: "Mockjax"
    }
  }
});
