/*---------------------------------------------------
Initial page focus and toggle input for 'other' option
---------------------------------------------------*/

$("#name").focus();

//hide 'other' input field
$("#other-title").hide();

//'other' input field toggle
$("#title").on("change", function() {
  const $inputValue = $(this).val();
  //show other input field
  if ($inputValue === "other") {
    $("#other-title").slideDown();
  } else {
    $("#other-title").slideUp();
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
    $('#color option[value="tomato"]').attr("selected", "");
    $('#color option[value="cornflowerblue"]').attr("selected", false);
    $("#color option").hide();
    $('#color option:not(:contains("Pun"))').show();
  }
  if ($userSelection === "js puns") {
    $('#color option[value="cornflowerblue"]').attr("selected", "");
    $('#color option[value="tomato"]').attr("selected", false);
    $("#color option").hide();
    $('#color option:contains("Pun")').show();
  }
});

/*---------------------------------------------------
Activities block
---------------------------------------------------*/

//new elements, global variables
const totalElement = '<p id="total"><p>';
$('.activities').append(totalElement);
$('#total').hide();
let activitiesTotal = 0;

//input listener with calculator of total price
$('.activities').on('change', 'input', function () {
  const $inputRef = $(this).is(':checked');
  console.log($inputRef);
  const $activityCost = parseInt($(this).attr('data-cost'));
  console.log($activityCost);

  if ($inputRef){
    activitiesTotal += $activityCost;
    if (activitiesTotal > 0) {
      $('#total').text('Total: $' + activitiesTotal).slideDown();
    }
  } else {
    activitiesTotal -= $activityCost;
    if (activitiesTotal === 0) {
    $('#total').text('Total: $' + activitiesTotal).slideUp();
    }
  }
});