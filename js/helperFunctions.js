function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}.${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
}

function getWeekString() {
  const date = moment(getFromStorage('date'));
  return moment(date).format('WW-YYYY');
}

function updateWeekText() {
  const date = moment(getFromStorage('date'));
  $('#weekText').text(`Woche ${moment(date).format('WW | YYYY')}`);
}
