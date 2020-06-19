let counter = 0;
let timeoutHandle;

function buttonPressed() {
  counter++;
  clearTimeout(timeoutHandle);
  timeoutHandle = setTimeout(() => (counter = 0), 1000);
  switch (counter) {
    case 10:
      showEasterEgg();
      break;
    case 20:
      rainbow();
      break;
    case 30:
      rick();
      break;
  }
}

function showEasterEgg() {
  $('#easterEgg').addClass('easterEgg');
}

function rainbow() {
  $('.easterEgg').css('background-size', '1800% 1800%');
}

function rick() {
  window.location.href = 'https://youtu.be/dQw4w9WgXcQ';
}
