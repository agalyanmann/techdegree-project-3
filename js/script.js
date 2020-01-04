//set focus to first input box on page
$("#name").focus();
//hide other input field
$("#other-title").hide();
//if other is selected for title
$("#title").on("change", function() {
  const $inputValue = $(this).val();
  //show other input field
  if ($inputValue === "other") {
    $("#other-title").fadeIn(1000);
  } else {
    $("#other-title").fadeOut(1000);
  }
});
//hide color select menu
$("#color").hide();
//place text instructing to select theme
const $themeInsturctions =
  '<h4 id="theme-instructions">Please select a T-shirt theme.</h4>';
$("#colors-js-puns").append($themeInsturctions);
//color menu transition
$("#design").on("change", function() {
  const $userSelection = $(this).val();
  if ($userSelection === "js puns" || $userSelection === "heart js") {
    $("#theme-instructions").fadeOut();
    $("#color")
      .delay(700)
      .fadeIn();
  } else {
    $("#color").fadeOut();
    $("#theme-instructions")
      .delay(700)
      .fadeIn();
  }
});

