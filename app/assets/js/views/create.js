define ([
  "jquery",
  "underscore",
  "backbone",
  "/assets/js/bootstrap.min.js",
  "text!/crea/persona",
  "text!/crea/startup",
  "text!/crea/investitore"
], function($, _, Backbone, Typeahead, PersonaTemplate, StartupTemplate, InvestitoreTemplate) {

  return Backbone.View.extend({

    events: {
      "click .btnStep1Controller": "goToStep2",
      "click .btnControl" : "submit"
    },

    initialize: function() {
      var step2 = this.getParameterByName("type")

      if(step2 !== null) {
        this.loadStep2(step2)
      }
    },

    body: function() {
      return $(this.el).find(".createBody")
    },

    submit: function(event) {

      var inputs = $(this.el).find("input")
      _.map(inputs, function(input) {
        var val = $(input).val()
        var key = $(input).data().name
        if(val != "") {
          console.log(key + ", " + val)
        }
      })
    },

    getParameterByName: function(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    goToStep2: function(event) {
      var $target = $(event.target)
      var btn = $target
      if(btn.is("h3")) {
        btn = btn.parent()
      }
      var step = $(btn).data().step.toLowerCase()
      /* update url with new state */
      this.setUrlWithParam(step)
      // upload new template
      this.loadStep2(step)
    },

    setUrlWithParam: function(param) {
      var pathname = window.document.location.pathname
      var newLocation = pathname + "?type=" + param
      this.setUrl(newLocation)
    },

    setUrl: function(newLocation) {
      window.history.pushState("", window.document.title,  newLocation)
    },
    
    loadStep2: function(type) {

      if(type === "persona") {
        Template = PersonaTemplate
      } else if (type === "startup") {
        Template = StartupTemplate
      }  else if (type === "investitore") {
        Template = InvestitoreTemplate
      } else {
        throw "type not found: " + type
      }

      if(Template !== null) {
        $(this.el).html(Template)
        $(this.el).find(".createControllers").show()
        $(this.el).find(".inputLavoro").typeahead()
      }
    }
  });
});
