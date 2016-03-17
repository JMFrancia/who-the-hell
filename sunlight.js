'use strict';
var sunlightApiKey = 'c7da72ec53894f039491c87023661f8e';
var sunlightLegislatorLocateUrl = 'http://congress.api.sunlightfoundation.com/legislators/locate/';

function Sunlight(zip) {
  this.query = {
    apikey: sunlightApiKey,
    zip: zip
  };
  this.getPeople();
}

Sunlight.prototype.saveResponse = function saveResponse(response) {
  this.people = response.results;
};

Sunlight.prototype.getPeople = function getPeople() {
  $.ajax({
    type: 'GET',
    url: sunlightLegislatorLocateUrl,
    dataType: 'json',
    data: this.query,
    success: function(response) {
      this.saveResponse(response);
    }.bind(this)
  });
};

