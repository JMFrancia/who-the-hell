$(document).ready(function onDocumentReady() {

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

  $(".controls")
    .addClass("animated slideOutDown");

  getMainContentElement()

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
