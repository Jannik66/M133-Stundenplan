// format date in table
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
}

// get week string for backend call
function getWeekString() {
  const date = moment(getFromStorage('date'));
  return moment(date).format('WW-YYYY');
}

// update text in nav
function updateWeekText() {
  const date = moment(getFromStorage('date'));
  $('#weekText').text(`Woche ${moment(date).format('WW | YYYY')}`);
}

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Weekdays for table
function getWeekday(index) {
  return ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][index];
}