/*---------------------------------------------------
Initial page focus and toggle input for "other" option
---------------------------------------------------*/
$("#name").focus();

//hide "other" input field
$("#other-title").hide();

//"other" input field toggle
$("#title").on("change", function() {
  const $inputValue = $(this).val();
  //show other input field
  if ($inputValue === "other") {
    $("#other-title").fadeIn(1000);
  } else {
    $("#other-title").fadeOut(1000);
  }
});

/*---------------------------------------------------
Color option animation and validation block
---------------------------------------------------*/
$("#color").hide();

//instruction text
const $themeInsturctions =
  '<h4 id="theme-instructions">Please select a T-shirt theme.</h4>';
$("#colors-js-puns").append($themeInsturctions);

//animation
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

  //validate colors to proper theme
  if ($userSelection === "heart js") {
    $("#color option").hide();
    $("#color option:not(:contains('Pun'))").show();
  }
  if ($userSelection === "js puns") {
    $("#color option").hide();
    $("#color option:contains('Pun')").show();
  }
});
