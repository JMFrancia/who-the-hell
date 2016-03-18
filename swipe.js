
var currentProfile = null;

var $controlPanel = null;

$(document).ready(function onDocumentReady() {

  $controlPanel = $(".control-panel");

  var hasPeople = addPeople(people)

  if (hasPeople) {
    addEventHandlers();
    currentProfile = $(".main-content").children().last();
  } else {
    hideControlPanel();
  }

});

function addPeople(profileArr) {

  if (!profileArr.length) {
    return false;
  }

  var getProfileHTML = getProfileTpl();

  profileArr.forEach(function addPerson(profile, index, arr) {

    var profileHTML = getProfileHTML(profile);

    var profileEl = $(profileHTML).toggle(index === arr.length - 1);

    $(".main-content").append(profileEl);

  });

  return true;

}

function addEventHandlers() {

  $(".no-button").on("click", function() {
    dislikePerson(currentProfile);
    currentProfile = getNextProfile();
  });

  $(".yes-button").on("click", function() {
    likePerson(currentProfile);
    currentProfile = getNextProfile();
  });

  $(".main-content").on("click", expandProfile);

  $(".main-content").on("swiperight", dislikePerson);
  // $(".no-button").on("click", dislikePerson);

  $(".main-content").on("swipeleft", likePerson);
  // $(".yes-button").on("click", likePerson);

}

function hideControlPanel() {
  $controlPanel
    .removeClass("slideInUp")
    .addClass("animated slideOutDown");
  $(".small-button")
    .addClass("hidden");
}

function showControlPanel() {
  if ($controlPanel.hasClass("slideOutDown")) {
    $controlPanel
      .removeClass("slideOutDown")
      .addClass("animated slideInUp");
  }
}

function getNextProfile() {
  var nextProfile = currentProfile.prev().fadeIn(500);
  if (nextProfile.index() === 0) {
    console.log("No people left.");
    hideControlPanel();
    return false;
  }
  unexpandProfile();
  return nextProfile;
}

function likePerson() {
  currentProfile.addClass("animated rotateOutUpRight liked");
}

function dislikePerson() {
  currentProfile.addClass("animated rotateOutUpLeft disliked");
}

function expandProfile() {

  hideControlPanel();

  $(".extended-bio")
    .fadeIn(1000);

  $(".main-content")
    .removeClass("small-version");

  $(".small-button")
    .removeClass("hidden");

}

function unexpandProfile() {

  showControlPanel();

  $(".extended-bio")
    .fadeOut(500);

  $(".main-content")
    .addClass("small-version");

  $(".small-button")
    .addClass("hidden");

}

function getProfileTpl() {
  var profileTplStr = [
    '<div class="profile-summary">',
      '<div class="profile-image-wrapper">',
      // '<img class="profile-image" src="<%= imageURL %>" />',
        '<img class="profile-image" src="images/face.jpeg" />',
      '</div>',
      '<div class="bio-summary">',
        '<div>',
          '<%= first_name %>&nbsp;<%= last_name %>, <%= age %>',
        '</div>',
        '<div>',
          '<%= chamber %>',
        '</div>',
      '</div>',
      '<div class="extended-bio">',
        '<%= blurb %>',
      '</div>',
    '</div>'].join('');
  return _.template(profileTplStr);
}

var people = [{
  age: 63,
  bioguide_id: "S000148",
  birthday: "1950-11-23",
  chamber: "senate",
  contact_form: "http://www.schumer.senate.gov/Contact/email-chuck",
  crp_id: "N00001093",
  district: null,
  facebook_id: "15771239406",
  fax: "202-228-3027",
  first_name: "Charles",
  gender: "M",
  govtrack_id: "300087",
  icpsr_id: 14858,
  in_office: true,
  last_name: "Schumer",
  lis_id: "S270",
  middle_name: "E.",
  name_suffix: null,
  nickname: "Chuck",
  oc_email: "Sen.Schumer@opencongress.org",
  ocd_id: "ocd-division/country:us/state:ny",
  office: "322 Hart Senate Office Building",
  party: "D",
  phone: "202-224-6542",
  senate_class: 3,
  state: "NY",
  state_name: "New York",
  state_rank: "senior",
  term_end: "2017-01-03",
  term_start: "2011-01-05",
  thomas_id: "01036",
  title: "Sen",
  twitter_id: "SenSchumer",
  votesmart_id: 26976,
  website: "http://www.schumer.senate.gov",
  youtube_id: "SenatorSchumer",
  blurb: "Looking for the constitutents of my dreams. I'm fond of Lawyers/Law Firms, Securities & Investment, and Real Estate. If you're looking for a good election cycle, give me a tap"
}, {
  age: 67,
  bioguide_id: "M000087",
  birthday: "1946-02-19",
  chamber: "house",
  contact_form: "https://maloney.house.gov/contact-me/email-me",
  crp_id: "N00000078",
  district: 12,
  facebook_id: "397176447066236",
  fax: "202-225-4709",
  first_name: "Carolyn",
  gender: "F",
  govtrack_id: "400251",
  icpsr_id: 29379,
  in_office: true,
  last_name: "Maloney",
  middle_name: "B.",
  name_suffix: null,
  nickname: null,
  oc_email: "Rep.Maloney@opencongress.org",
  ocd_id: "ocd-division/country:us/state:ny/cd:12",
  office: "2308 Rayburn House Office Building",
  party: "D",
  phone: "202-225-7944",
  state: "NY",
  state_name: "New York",
  term_end: "2017-01-03",
  term_start: "2015-01-06",
  thomas_id: "00729",
  title: "Rep",
  twitter_id: "RepMaloney",
  votesmart_id: 26978,
  website: "http://maloney.house.gov",
  youtube_id: null,
  blurb: "Looking for the constitutents of my dreams. I enjoys receiving contributions from Securities & Investment, Lawyers/Law Firms, and Real Estate. Interested in what you see? Tap for more"
}, {
  age: 57,
  bioguide_id: "G000555",
  birthday: "1966-12-09",
  chamber: "senate",
  contact_form: "http://www.gillibrand.senate.gov/contact/",
  crp_id: "N00027658",
  district: null,
  facebook_id: "KirstenGillibrand",
  fax: "202-225-1168",
  first_name: "Kirsten",
  gender: "F",
  govtrack_id: "412223",
  icpsr_id: 20735,
  in_office: true,
  last_name: "Gillibrand",
  lis_id: "S331",
  middle_name: "E.",
  name_suffix: null,
  nickname: null,
  oc_email: "Sen.Gillibrand@opencongress.org",
  ocd_id: "ocd-division/country:us/state:ny",
  office: "478 Russell Senate Office Building",
  party: "D",
  phone: "202-224-4451",
  senate_class: 1,
  state: "NY",
  state_name: "New York",
  state_rank: "junior",
  term_end: "2019-01-03",
  term_start: "2013-01-03",
  thomas_id: "01866",
  title: "Sen",
  twitter_id: "SenGillibrand",
  votesmart_id: 65147,
  website: "http://www.gillibrand.senate.gov",
  youtube_id: "KirstenEGillibrand",
  blurb: "Are you the voter for me? I'm fond of Real Estate, Securities & Investment, and Insurance. Give me a tap and let's get democratic together"
}];
