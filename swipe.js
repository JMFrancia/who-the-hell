var people = [];

var $currentProfile = null;

var $controlPanel, $smallButtons, $mainContent;

$(document).ready(function onDocumentReady() {

  $controlPanel = $(".control-panel");
  $smallButtons = $(".small-button");
  $mainContent = $(".main-content");

  $(".start-button").click(onStartButtonClick);

});

function onStartButtonClick() {
  var zipCode = $('#zip-code-input').val();
  if (zipCode.length !== 5 || _.isNumber(zipCode *= 1) === false) {
    $(".zip-code-message").hide();
    $(".zip-code-warning").show();
    return;
  }
  console.log(zipCode);
  people = new People(zipCode, false).people;
  browsePeople();
}

function browsePeople() {
  if (addPeople(people) === true) {
    $currentProfile = $mainContent.children().last();
    addProfileEventHandlers($currentProfile);
    addButtonEventHandlers();
    $(".splash").fadeOut(300);
    $(".main").fadeIn(300);
  } else {
    // NOBODY TO SEE!!!!
  }
}

function addPeople(people) {
  if (!people.length) {
    return false;
  }
  var lastIndex = people.length - 1;
  var getProfileHTML = getProfileTplFn();
  people.forEach(function addPerson(profile, index) {
    var profileHTML = getProfileHTML(profile);
    $(profileHTML)
      .toggle(index === lastIndex) // only show the last person
      .appendTo($mainContent);
  });
  return true;
}

function addProfileEventHandlers($profile) {
  $profile.on("swiperight", likePerson);
  $profile.on("swipeleft", dislikePerson);
  $profile.on("click", "img", function onClickProfileSummary() {
    expandProfile($profile);
  });
}

function addButtonEventHandlers() {
  $(".no-button").on("click", dislikePerson);
  $(".yes-button").on("click", likePerson);
}

function hideControls() {
  $controlPanel
    .removeClass("slideInUp")
    .addClass("animated slideOutDown");
  $smallButtons
    .addClass("hidden");
}

function showMainControlPanel() {
  if ($controlPanel.hasClass("slideOutDown")) {
    $controlPanel
      .removeClass("slideOutDown")
      .addClass("animated slideInUp");
  }
}

function getNextProfile($profile) {
  var $nextProfile;
  $profile.off();
  unexpandProfile($profile);
  $nextProfile = $profile.prev().fadeIn(500);
  if ($nextProfile.index() === 0) {
    hideControls();
    return false;
  }
  addProfileEventHandlers($nextProfile);
  return $nextProfile;
}

function likePerson() {
  $currentProfile.liked = true;
  $currentProfile
    .addClass("animated rotateOutUpRight liked")
    .hide(1000);
  $currentProfile = getNextProfile($currentProfile);
}

function dislikePerson() {
  $currentProfile.liked = false;
  $currentProfile
    .addClass("animated rotateOutUpLeft disliked")
    .hide(1000);
  $currentProfile = getNextProfile($currentProfile);
}

function expandProfile($profile) {
  hideControls();
  $profile.find(".extended-bio").fadeIn(1000);
  $mainContent.removeClass("small-version");
  $smallButtons.removeClass("hidden");
}

function unexpandProfile($profile) {
  showMainControlPanel();
  $profile.find(".extended-bio").fadeOut(500);
  $mainContent.addClass("small-version");
  $smallButtons.addClass("hidden");
}

function getProfileTplFn() {
  var profileTplStr = [
    '<div class="profile-summary">',
      '<div class="profile-image-wrapper">',
      '<img class="profile-image" src="<%= portrait %>" />',
      '</div>',
      '<div class="bio-summary">',
        '<div>',
          '<%= first_name %>&nbsp;<%= last_name %>, <%= age %>',
        '</div>',
        '<div>',
          '<%= job %>',
        '</div>',
      '</div>',
      '<div class="extended-bio" style="display: none;">',
        '<%= blurb %>',
      '</div>',
    '</div>'
  ].join('');
  return _.template(profileTplStr);
}















//
//
// var people = [{
//   age: 63,
//   bioguide_id: "S000148",
//   birthday: "1950-11-23",
//   chamber: "senate",
//   contact_form: "http://www.schumer.senate.gov/Contact/email-chuck",
//   crp_id: "N00001093",
//   district: null,
//   facebook_id: "15771239406",
//   fax: "202-228-3027",
//   first_name: "Charles",
//   gender: "M",
//   govtrack_id: "300087",
//   icpsr_id: 14858,
//   in_office: true,
//   last_name: "Schumer",
//   lis_id: "S270",
//   middle_name: "E.",
//   name_suffix: null,
//   nickname: "Chuck",
//   oc_email: "Sen.Schumer@opencongress.org",
//   ocd_id: "ocd-division/country:us/state:ny",
//   office: "322 Hart Senate Office Building",
//   party: "D",
//   phone: "202-224-6542",
//   senate_class: 3,
//   state: "NY",
//   state_name: "New York",
//   state_rank: "senior",
//   term_end: "2017-01-03",
//   term_start: "2011-01-05",
//   thomas_id: "01036",
//   title: "Sen",
//   twitter_id: "SenSchumer",
//   votesmart_id: 26976,
//   website: "http://www.schumer.senate.gov",
//   youtube_id: "SenatorSchumer",
//   blurb: "Looking for the constitutents of my dreams. I'm fond of Lawyers/Law Firms, Securities & Investment, and Real Estate. If you're looking for a good election cycle, give me a tap"
// }, {
//   age: 67,
//   bioguide_id: "M000087",
//   birthday: "1946-02-19",
//   chamber: "house",
//   contact_form: "https://maloney.house.gov/contact-me/email-me",
//   crp_id: "N00000078",
//   district: 12,
//   facebook_id: "397176447066236",
//   fax: "202-225-4709",
//   first_name: "Carolyn",
//   gender: "F",
//   govtrack_id: "400251",
//   icpsr_id: 29379,
//   in_office: true,
//   last_name: "Maloney",
//   middle_name: "B.",
//   name_suffix: null,
//   nickname: null,
//   oc_email: "Rep.Maloney@opencongress.org",
//   ocd_id: "ocd-division/country:us/state:ny/cd:12",
//   office: "2308 Rayburn House Office Building",
//   party: "D",
//   phone: "202-225-7944",
//   state: "NY",
//   state_name: "New York",
//   term_end: "2017-01-03",
//   term_start: "2015-01-06",
//   thomas_id: "00729",
//   title: "Rep",
//   twitter_id: "RepMaloney",
//   votesmart_id: 26978,
//   website: "http://maloney.house.gov",
//   youtube_id: null,
//   blurb: "Looking for the constitutents of my dreams. I enjoys receiving contributions from Securities & Investment, Lawyers/Law Firms, and Real Estate. Interested in what you see? Tap for more"
// }, {
//   age: 57,
//   bioguide_id: "G000555",
//   birthday: "1966-12-09",
//   chamber: "senate",
//   contact_form: "http://www.gillibrand.senate.gov/contact/",
//   crp_id: "N00027658",
//   district: null,
//   facebook_id: "KirstenGillibrand",
//   fax: "202-225-1168",
//   first_name: "Kirsten",
//   gender: "F",
//   govtrack_id: "412223",
//   icpsr_id: 20735,
//   in_office: true,
//   last_name: "Gillibrand",
//   lis_id: "S331",
//   middle_name: "E.",
//   name_suffix: null,
//   nickname: null,
//   oc_email: "Sen.Gillibrand@opencongress.org",
//   ocd_id: "ocd-division/country:us/state:ny",
//   office: "478 Russell Senate Office Building",
//   party: "D",
//   phone: "202-224-4451",
//   senate_class: 1,
//   state: "NY",
//   state_name: "New York",
//   state_rank: "junior",
//   term_end: "2019-01-03",
//   term_start: "2013-01-03",
//   thomas_id: "01866",
//   title: "Sen",
//   twitter_id: "SenGillibrand",
//   votesmart_id: 65147,
//   website: "http://www.gillibrand.senate.gov",
//   youtube_id: "KirstenEGillibrand",
//   blurb: "Are you the voter for me? I'm fond of Real Estate, Securities & Investment, and Insurance. Give me a tap and let's get democratic together"
// }];
