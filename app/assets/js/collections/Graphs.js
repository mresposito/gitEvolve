define ([
  "jquery",
  "underscore",
  "backbone",
  "models/Graph"
], function($, _, Backbone, Graph) {

  return Backbone.Collection.extend({

    model: Graph,
    initialize: function(callback){
      self = this;
      $.getJSON("/v1/data/", function(data) {
        _.each(data, function(elem) {
          self.add(new Graph(elem))
        });
        callback(self);
      });
    },

    findByName: function(name) {
      var mol = null
      this.each(function (model) {
        graph = model.get("graph")
        if(graph != null && graph.name === name) {
          mol = model
        }
      });
      return mol;
    }
  });
});
