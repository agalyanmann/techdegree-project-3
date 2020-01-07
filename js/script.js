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
T-shirt Section
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
Activity Section
---------------------------------------------------*/

//create element to display total activity cost & global variables
const totalElement = '<p id="total"><p>';
$(".activities").append(totalElement);
$("#total").hide();
let activitiesTotal = 0;

//listen for changes in activity section & variables needed for the enitre scope
$(".activities").on("change", "input", function() {
  const $inputRef = $(this).is(":checked");
  const $activityCost = parseInt($(this).attr("data-cost"));
  const $timeStamp = $(this).attr("data-day-and-time");

  //updating and displaing total activiy cost
  if ($inputRef) {
    activitiesTotal += $activityCost;
    if (activitiesTotal > 0) {
      $("#total")
        .text("Total: $" + activitiesTotal)
        .slideDown();
    }
  } else {
    activitiesTotal -= $activityCost;
    if (activitiesTotal === 0) {
      $("#total").slideUp();
    } else {
      $("#total").text("Total: $" + activitiesTotal);
    }
  }

  //Disabling conflicting activities
  $(".activities label input").each(function() {
    const activityTimeStamp = this;

    if (
      $(activityTimeStamp).attr("data-day-and-time") === $timeStamp &&
      $(activityTimeStamp).attr("name") !== $inputRef
    ) {
      if ($inputRef) {
        $(this)
          .not(":checked")
          .attr("disabled", "");
      } else {
        $(this).attr("disabled", false);
      }
    }
  });
});

/*---------------------------------------------------
Payment Section
---------------------------------------------------*/

//initial setup for default payment (credit card)
$('#payment option[value="select method"]')
  .hide()
  .removeAttr("selected");
$('#payment option[value="credit card"]').attr("selected", "");
$("#paypal").hide();
$("#bitcoin").hide();

//provide correct payment option based on user selection
$("#payment").on("change", function() {
  const $paymentMethod = $(this).val();
  if ($paymentMethod === "credit card") {
    $("#credit-card").slideDown();
    $("#paypal").hide();
    $("#bitcoin").hide();
  } else if ($paymentMethod === "paypal") {
    $("#paypal").fadeIn();
    $("#credit-card").hide();
    $("#bitcoin").hide();
  } else {
    $("#bitcoin").fadeIn();
    $("#paypal").hide();
    $("#credit-card").hide();
  }
});
