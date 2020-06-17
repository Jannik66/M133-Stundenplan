const weekdays = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag'
]

let date = moment();
let classId;

function loadProfessions() {
  $.getJSON('http://sandbox.gibm.ch/berufe.php', function (data) {
    for (i = 0; i < data.length; i++) {
      $('#profession').append(`<option value=${data[i].beruf_id}>${data[i].beruf_name}</option>`);
    }
  });
}

function loadClasses(professionId) {
  $.getJSON(`http://sandbox.gibm.ch/klassen.php?beruf_id=${professionId}`, function (data) {
    $('#class').empty();
    for (i = 0; i < data.length; i++) {
      $('#class').append(`<option value=${data[i].klasse_id}>${data[i].klasse_name}</option>`);
    }
  });
}

function loadTable() {
  const weekString = getWeekString();
  $.getJSON(`http://sandbox.gibm.ch/tafel.php?klasse_id=${classId}&woche=${weekString}`, function (data) {
    console.log(data);
    $('#tableBody').empty();
    for (i = 0; i < data.length; i++) {
      $('#tableBody').append(`
      <tr>
        <td>${formatDate(data[i].tafel_datum)}</td>
        <td>${weekdays[data[i].tafel_wochentag]}</td>
        <td>${data[i].tafel_von}</td>
        <td>${data[i].tafel_bis}</td>
        <td>${data[i].tafel_lehrer}</td>
        <td>${data[i].tafel_longfach}</td>
        <td>${data[i].tafel_raum}</td>
      </tr>
      `);
    }
  });
}

$('#profession').change(function () {
  loadClasses($(this).val());
  $('#classFormGroup').show();
});

$('#class').change(function () {
  classId = $(this).val();
  updateWeekText();
  loadTable();
  $('.table').show();
  $('.nav').show();
});

$('#weekback').click(function () {
  date.subtract(1, 'week');
  updateWeekText();
  loadTable(classId);
});

$('#weekforward').click(function () {
  date.add(1, 'week');
  updateWeekText();
  loadTable(classId);
});

loadProfessions();

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}.${(date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
}

function getWeekString() {
  return date.format('WW-YYYY');
}

function updateWeekText() {
  $('#weekText').text(`Woche ${date.format('WW')}`);
}