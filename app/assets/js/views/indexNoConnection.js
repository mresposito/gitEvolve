define ([
  "jquery",
  "underscore",
  "backbone"
], function($, _, Backbone) {

  return Backbone.View.extend({

    events: {
      "click .fbLogin": "fbLogin",
      "click .fbLogout": "fbLogout"
    },

    initialize: function() {
      this.local = true;
    },

    fbLogin:  function(event) {
      var data = {
        "fbId": "o0i3ha",
        "email": "michele@gmail.com",
        "name": "Michele"
      };
      this.toServer("/login", data) 
    },

    fbLogout:  function(event) {
      this.toServer("/logout", {}) 
    },

    toServer: function(path, data) {
      $.ajax({
        url: path,
        data: data
      }).done(function() {
        window.location.reload(true);
      });
    }
  });
});
