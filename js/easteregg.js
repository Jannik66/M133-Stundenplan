/**
 * EasterEgg
 * unnecessary easter egg made just for fun
 */

let counter = 0;
let timeoutHandle;

// count each time the middle navigation button was pressed. reset after 1 second
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

// show rainbow background
function showEasterEgg() {
  $('#easterEgg').addClass('easterEgg');
}

// animate background
function rainbow() {
  $('.easterEgg').css('background-size', '1800% 1800%');
}

// get rick rolled (Old but gold)
function rick() {
  window.location.href = 'https://youtu.be/dQw4w9WgXcQ';
}
