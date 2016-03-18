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
  people = new People(zipCode, false);
  browsePeople();
}

function browsePeople() {
  if (addPeople(people.people) === true) {
    $currentProfile = $mainContent.children().last();
    addProfileEventHandlers($currentProfile);
    addButtonEventHandlers();
    $(".splash").fadeOut(300);
    $(".main").fadeIn(300);
  } else {
    // NOBODY TO SEE!!!!
  }
}

function addPeople(peopleArr) {
  if (!peopleArr.length) {
    return false;
  }
  var lastIndex = peopleArr.length - 1;
  var getProfileHTML = getProfileTplFn();
  peopleArr.forEach(function addPerson(profile, index) {
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
  $profile.on("click", function onClickProfileSummary() {
    expandProfile($profile);
  });
}

function addButtonEventHandlers() {
  $(".no-button").on("click", dislikePerson);
  $(".yes-button").on("click", likePerson);
  $(".results-button").on("click", function onResultsButtonClick() {
    populateResultsPage();
    $(".main").fadeOut(500);
    $(".results-page").fadeIn(500);
  });
}

function populateResultsPage() {
  var html = '';
  var page = $(".results-page");
  var getHTML = people.generateSummaryTile;
  people.people = addLikeOrDislikedKey(people.people);
  people.people = _.filter(people.people, function(person) {
    return !person.liked;
  });
  people.people.forEach(function addResultForPerson(person) {
    html = getHTML.call(people, person);
    html = $(html);
    page.append(html);
  })
}

function addLikeOrDislikedKey(peopleArr) {
  $(".profile-summary").each(function addKey(index, el) {
    console.log(el);
    peopleArr[index].liked = ($(el).attr("liked") === "true");
  });
  return peopleArr;
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
  $currentProfile.attr("liked", true);
  $currentProfile
    .addClass("animated rotateOutUpRight liked")
    .hide(1000);
  $currentProfile = getNextProfile($currentProfile);
}

function dislikePerson() {
  $currentProfile.attr("liked", false);
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
        '<div style="margin-bottom: 20px;>"<%= blurb %></div>',
        '<div style="margin-bottom: 20px; font-weight: bold;">Here are some bills I supported:</div>',
        '<% _.forEach(bills, function(bill) { %><p><%- bill.name %></p><% }); %>',
      '</div>',
    '</div>'
  ].join('');
  return _.template(profileTplStr);
}
