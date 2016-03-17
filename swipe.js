$(document).ready(function onDocumentReady() {

  people.forEach(function addProfile(profile) {
    console.log("sdffsdamfadsf");
  });

  $(".no-button").on("click", function() {
    getMainContentElement().addClass("animated rotateOutUpLeft");
    // dislikePerson.call(getMainContentElement());
  });

  $(".yes-button").on("click", function() {
    getMainContentElement().addClass("animated rotateOutUpRight");
    // likePerson.call(getMainContentElement());
  });

  // $(".no-button").on("click", dislikePerson);

  // $(".yes-button").on("click", likePerson);

  $(".main-content").on("click", expandProfile);

  $(".main-content").on("swiperight", dislikePerson);

  $(".main-content").on("swipeleft", likePerson);

});

function likePerson() {

  $(this)
    .addClass('rotate-right')
    .delay(700)
    .fadeOut(1);

  // if ( $(this).is(':last-child') ) {
  //   $('.main-content:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
  // } else {
  //   $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
  // }

}

function getMainContentElement() {
  return $(".main-content");
}

function expandProfile() {

  $(".control-panel")
    .addClass("animated slideOutDown");

  $(".extended-bio")
    .fadeIn(1000);

  $(".main-content")
    .removeClass("small-version");

  $(".small-button")
    .removeClass("hidden");

  // $(".no-button.small-button")
  //   .removeClass("slideOutLeft")
  //   .addClass("slideInLeft");
  //
  // $(".yes-button.small-button")
  //   .removeClass("slideOutRight")
  //   .addClass("slideInRight");

}

function dislikePerson() {

  $(this)
    .addClass('rotate-left')
    .delay(700)
    .fadeOut(1);

  // if ( $(this).is(':last-child') ) {
  //   $('.main-content:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
  // } else {
  //   $(this).next().removeClass('rotate-left rotate-right').fadeIn(400);
  // }

}






var people = [{
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
  youtube_id: "SenatorSchumer"
}, {
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
  youtube_id: null
}, {
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
  youtube_id: "KirstenEGillibrand"
}];
