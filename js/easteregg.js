let counter = 0;
let timeoutHandle;

function buttonPressed() {
  counter++;
  clearTimeout(timeoutHandle);
  timeoutHandle = setTimeout(() => (counter = 0), 1000);
  if (counter === 10) {
    showEasterEgg();
  }
  if (counter === 20) {
    rainbow();
  }
}

function showEasterEgg() {
  $('#easterEgg').addClass('easterEgg');
}

function rainbow() {
  $('.easterEgg').css('background-size', '1800% 1800%');
}
