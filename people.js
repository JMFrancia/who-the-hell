'use strict';
var sunlightApiKey = 'c7da72ec53894f039491c87023661f8e';
var openSecretsApiKey = '35776fd4c0bb1d6f8153182389162f86';
var sunlightLegislatorLocateUrl = 'http://congress.api.sunlightfoundation.com/legislators/locate/';

function People(zip, useOpenSecretsApi) {
  if (!useOpenSecretsApi) {
    useOpenSecretsApi = false;
  }
  this.sunlightQuery = {
    apikey: sunlightApiKey,
    zip: zip
  };
  this.callSunlightApi();
  this.addPortraits();
  this.addAges();
  if(useOpenSecretsApi){
    this.addIndustries();
  }
}

People.prototype.saveResponse = function saveResponse(response) {
  this.people = response.results;
};

People.prototype.callSunlightApi = function callSunlightApi() {
  $.ajax({
    type: 'GET',
    url: sunlightLegislatorLocateUrl,
    dataType: 'json',
    data: this.sunlightQuery,
    async: false,
    success: function(response) {
      this.saveResponse(response);
    }.bind(this)
  });
};

People.prototype.addPortraits = function addPortraits(){
  _.forEach(this.people, function(person){
    person.portrait = "https://www.govtrack.us/data/photos/" + person.govtrack_id + ".jpeg";
  });
}

People.prototype.addAges = function addAges(){
  var currentDate = new Date();
  _.forEach(this.people, function(person){
    var bday = person.birthday.split('-');
    var birthYear = bday[0];
    var birthMonth = bday[1];
    var birthDay = bday[2];
    var age = currentDate.getFullYear() - birthYear;
    if(currentDate.getMonth() < birthMonth - 1){
      if(currentDate.getDate() < birthDay - 1){
        age--;
      }
    }
    person.age = age;
  });
}

People.prototype.addIndustries = function addIndustries(){
  var currentCycle = new Date().getFullYear();
  _.forEach(this.people, function(person){
    $.ajax({
      type: 'GET',
      url: 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + person.crp_id + '&cycle=' + currentCycle + '&apikey=' + openSecretsApiKey + '&output=json',
      dataType: 'JSON',
      success: function(response) {
        person.industries = [];
        _.forEach(response.response.industries.industry, function(industry){
          person.industries.push({
            'name': industry["@attributes"].industry_name,
            'total': industry["@attributes"].total
          });
        });
      }.bind(this)
    });
  });
}

People.prototype.generateOSIndUrl = function generateOSIndUrl(cid){
  var currentCycle = new Date().getFullYear();
  return 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + cid + '&cycle=' + currentCycle + '&apikey=' + openSecretsApiKey;
}

People.prototype.addBlurbs = function addBlurbs(){
  _forEach(this.people, function(person){
    person.generateBlurb();
  });
}

People.prototype.generateBlurb = function generateBlurb(){
  var result = '';
  //result +=
}
