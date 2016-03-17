'use strict';
var sunlightApiKey = 'c7da72ec53894f039491c87023661f8e';
var sunlightLegislatorLocateUrl = 'http://congress.api.sunlightfoundation.com/legislators/locate/';

function People(zip) {
  this.query = {
    apikey: sunlightApiKey,
    zip: zip
  };
  this.getPeople();
}

People.prototype.saveResponse = function saveResponse(response) {
  this.people = response.results;
};

People.prototype.callSunlightApi = function callSunlightApi() {
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

