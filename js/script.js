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

//provide correct payment message based on user selection
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

/*---------------------------------------------------
Form Validation
---------------------------------------------------*/

//regex functions

//must be a first and last name with 2 or more characters
function isValidName(name) {
  return /^[a-z]{2,} [a-z]{2,}$/i.test(name);
}

//notify the user no special characters allowed in the name
function noSpecialChar(name) {
  return /[^\w ]/.test(name);
}

//must input valid email name@domain.com
function isValidEmail(email) {
  return /[^@]+@[^@.]+\.[a-z]+/i.test(email);
}

//must check min. of one activity
function isValidActivity() {
  return $(".activities label input").is(":checked");
}

//card number must be between 13-16 digits
function isValidCreditCardNumber(cardNumber) {
  return /^\d{13,16}$/.test(cardNumber);
}

//zip code must be 5 digits
function isValidZipCode(zipCode) {
  return /^\d{5}$/.test(zipCode);
}

//CVV must be 3 digits
function isValidCVV(CVV) {
  return /^\d{3}$/.test(CVV);
}

//bundle credit card regex
function ccValidator() {
  const userCardNumber = $("#cc-num").val();
  const userZip = $("#zip").val();
  const userCVV = $("#cvv").val();
  if (
    isValidCreditCardNumber(userCardNumber) &&
    isValidZipCode(userZip) &&
    isValidCVV(userCVV)
  ) {
    return true;
  } else {
    return false;
  }
}

//function to validate entire form
function isValidForm() {
  const userName = $("#name").val();
  const userEmail = $("#mail").val();

  if ($("#payment").val() === "credit card") {
    if (
      isValidName(userName) &&
      isValidActivity() &&
      isValidEmail(userEmail) &&
      ccValidator()
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    if (isValidName(userName) && isValidActivity() && isValidEmail(userEmail)) {
      return true;
    } else {
      return false;
    }
  }
}

//event listener to prevent incomplete form submission
$("form").on("submit", function() {
  if (!isValidForm()) {
    event.preventDefault();
  }
});

/*---------------------------------------------------
Real Time Form Validation
---------------------------------------------------*/

//validation message elements
const nameSpan = `<span id='nameSpan' class='errorSpan'>Please provide your first and last name.</span>`;
$("#name").after(nameSpan);
const nameSpanSpecialChar = `<span id='specialCharSpan' class='errorSpan'>Please do not use any special characters.</span>`;
$("#name").after(nameSpanSpecialChar);

const mailSpan = `<span id='mailSpan' class='errorSpan'>Please provide a valid email.</span>`;
$("#mail").after(mailSpan);
const activitySpan = `<span id='activitySpan' class='errorSpan'>Please select the activities you would like to attend.</span>`;
$(".activities").prepend(activitySpan);
const paymentSpan = `<span id='paymentSpan' class='errorSpan'>Please provide your payment information.</span>`;
$("#payment").after(paymentSpan);

//toggle realtime messages
$("form").on("input", function() {
  const userName = $("#name").val();
  const validName = isValidName(userName);
  const userEmail = $("#mail").val();
  const validEmail = isValidEmail(userEmail);
  const regexName = noSpecialChar(userName);

  if (validName) {
    $("#nameSpan").fadeOut();
    $("#specialCharSpan").fadeOut();
    $("#name").css("border-color", "rgba(8, 63, 87, 0.6)");
  } else if (regexName) {
    $("#nameSpan").fadeOut();
    $("#specialCharSpan").fadeIn();
    $("#name").css("border-color", "red");
  } else {
    $("#nameSpan").fadeIn();
    $("#name").css("border-color", "rgba(8, 63, 87, 0.6)");
  }

  if (validEmail) {
    $("#mailSpan").fadeOut();
  } else {
    $("#mailSpan").fadeIn();
  }

  if (isValidActivity()) {
    $("#activitySpan").fadeOut();
  } else {
    $("#activitySpan").fadeIn();
  }

  if (ccValidator() || $("#payment").val() !== "credit card") {
    $("#paymentSpan").fadeOut();
  } else {
    $("#paymentSpan").fadeIn();
  }
});
