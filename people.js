'use strict';
var sunlightApiKey = 'c7da72ec53894f039491c87023661f8e';
var openSecretsApiKey = '35776fd4c0bb1d6f8153182389162f86';
var sunlightLegislatorLocateUrl = 'http://congress.api.sunlightfoundation.com/legislators/locate/';


function People(zip) {
  this.query = {
    apikey: sunlightApiKey,
    zip: zip
  };
  this.callSunlightApi();
  this.addPortraits();
  this.addAges();
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

People.prototype.addPortraits = function addPortraits(){
  for(person in this.people){
    person.portrait = "https://www.govtrack.us/data/photos/" + person.govtrack_id + ".jpeg";
  }
}

People.prototype.addAges = function addAges(){
  var currentDate = new Date();
  for(person in this.people){
    debugger;
    var bday = person.birthday.split('-');
    var birthday = new Date(bday[0], bday[1], bday[2]);
    var age = (currentDate - birthday).getFullYear();
    person.age = age;
  }
}

People.prototype.addIndustries = function addIndustries(){}
