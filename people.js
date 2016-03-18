'use strict';
var sunlightApiKey = 'c7da72ec53894f039491c87023661f8e';
var openSecretsApiKey = '35776fd4c0bb1d6f8153182389162f86';
var sunlightLegislatorLocateUrl = 'http://congress.api.sunlightfoundation.com/legislators/locate/';
var sunlightAllCongressUrl = 'http://congress.api.sunlightfoundation.com/legislators';

function People(zip, useOpenSecretsApi) {
  useOpenSecretsApi = useOpenSecretsApi || false;
  this.people = [];

  if (zip) {
    this.getDataWithZip(zip, useOpenSecretsApi);
  } else {
    this.getAllCongress();
  }

  this.addPortraits();
  this.addAgesAndJobs();
  this.addBlurbs();
}

People.prototype.getDataWithZip = function getDataWithZip(zip, useOpenSecretsApi) {
  var query = {
    apikey: sunlightApiKey,
    zip: zip
  };

  this.callSunlightApi(sunlightLegislatorLocateUrl, query);

  if (useOpenSecretsApi) {
    this.addIndustries();
  }
};

People.prototype.getAllCongress = function getAllCongress() {
  var nPages = 11;
  var i;
  for (i = 0; i < nPages; i++) {
    this.callSunlightApi(sunlightAllCongressUrl, {
      apikey: sunlightApiKey,
      per_page: 50,
      page: i + 1
    });
  }
};

People.prototype.callSunlightApi = function callSunlightApi(url, data) {
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    data: data,
    async: false,
    success: function(response) {
      this.savePeople(response.results);
    }.bind(this)
  });
};

People.prototype.savePeople = function savePeople(response) {
  this.people = this.people.concat(response);
};

People.prototype.addPortraits = function addPortraits(){
  _.forEach(this.people, function(person){
    person.portrait = "https://www.govtrack.us/data/photos/" + person.govtrack_id + ".jpeg";
  });
}

People.prototype.addAgesAndJobs = function addAgesAndJobs(){
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
    person.job = person.office.indexOf('S') > -1  ? 'Senator of ' : 'Representative of District ' + person.district + ' of ';
    person.job += person.state_name;
  });
}

People.prototype.addIndustries = function addIndustries(){
  var currentCycle = new Date().getFullYear();
  _.forEach(this.people, function(person){
    $.ajax({
      type: 'GET',
      url: 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + person.crp_id + '&cycle=' + currentCycle + '&apikey=' + openSecretsApiKey + '&output=json',
      dataType: 'JSON',
      async: true,
      success: function(response) {
        person.industries = [];
        _.forEach(response.response.industries.industry, function(industry){
          person.industries.push({
            'name': industry["@attributes"].industry_name,
            'total': industry["@attributes"].total
          });
        });



          var blurbGen = new BlurbGenerator();
          person.blurb = blurbGen.getFirstLine() + ' ';
          if(person.industries){
            person.blurb +=  blurbGen.getSecondLine() + person.industries[0].name + ', ' +
            person.industries[1].name + ', and ' + person.industries[2].name + '. ';
          }
          person.blurb += blurbGen.getThirdLine();


      }.bind(this)
    });
  });
}

People.prototype.generateOSIndUrl = function generateOSIndUrl(cid){
  var currentCycle = new Date().getFullYear();
  return 'http://www.opensecrets.org/api/?method=candIndustry&cid=' + cid + '&cycle=' + currentCycle + '&apikey=' + openSecretsApiKey;
}

People.prototype.addBlurbs = function addBlurbs(){
  var blurbGen = new BlurbGenerator();
  _.forEach(this.people, function(person){
    if(!person.blurb){
      person.blurb = blurbGen.getFirstLine();
    }
  });
}

People.prototype.generateBlurb = function generateBlurb(){
    var blurbGen = new BlurbGenerator();
    this.blurb = this.getFirstLine();
    if(this.industries){
      this.blurb +=  blurbGen.getSecondLine() + this.industries[0].name + ', ' +
      this.industries[1].name + ', and ' + this.industries[2].name + '.';
    }
    this.blurb += this.getThirdLine();
}

function BlurbGenerator(){
  this.intros = [
    "Are you the voter for me?",
    "Looking for the constitutents of my dreams.",
  ];
  this.interests = [
    "I'm fond of ",
    "I enjoys receiving contributions from ",
    "I've been known to enjoy ",
    "My turn ons include "
  ];
  this.conclusions = [
    "If you're looking for a good election cycle, give me a tap",
    "Interested in what you see? Tap for more",
    "Give me a tap and let's get democratic together"
  ]
}

BlurbGenerator.prototype.getFirstLine = function getFirstLine(){
  return this.intros[Math.floor(Math.random()*this.intros.length)];
}

BlurbGenerator.prototype.getSecondLine = function getSecondLine(){
  return this.interests[Math.floor(Math.random()*this.interests.length)];
}

BlurbGenerator.prototype.getThirdLine = function getThirdLine(){
  return this.conclusions[Math.floor(Math.random()*this.conclusions.length)];
}
