const weekdays = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag'
]

function loadProfessions() {
  $.get('http://sandbox.gibm.ch/berufe.php', function (data) {
    for (i = 0; i < data.length; i++) {
      $('#profession').append(`<option value=${data[i].beruf_id}>${data[i].beruf_name}</option>`);
    }
  });
}

function loadClasses(professionId) {
  $.get(`http://sandbox.gibm.ch/klassen.php?beruf_id=${professionId}`, function (data) {
    $('#class').empty();
    for (i = 0; i < data.length; i++) {
      $('#class').append(`<option value=${data[i].klasse_id}>${data[i].klasse_name}</option>`);
    }
  });
}

function loadTable(classId) {
  $.get(`http://sandbox.gibm.ch/tafel.php?klasse_id=${classId}`, function (data) {
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
  loadTable($(this).val());
  $('.table').show();
});

loadProfessions();

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}.${(date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}.${date.getFullYear()}`;
}