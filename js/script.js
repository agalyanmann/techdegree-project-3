//set focus to first input box on page
$('#name').focus();
//hide other input field
$('#other-title').hide();
//if other is selected for title
$('#title').change(function(){
    const inputValue = $(this).val()
    //show other input field
    if (inputValue === 'other') {
        $('#other-title').fadeIn(1000);
    } else {
        $('#other-title').fadeOut(1000);
    }
});
//hide color select menu
$('#color').hide();
//place text instructing to select theme
$('#colors-js-puns').append('<h3 class="theme-instuctions">Please select a shirt theme.</h3>');
//if theme1
    //show relevant colors
//if theme2
    //show relevant colors