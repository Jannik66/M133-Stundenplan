let classId;

// call init method
init();

// Init website
// load professions
// load preselections from local storage
async function init() {
  // enable all tooltips
  $('[data-toggle="tooltip"]').tooltip();
  await loadProfessions();
  await loadFromStorage();
  initListeners();
}

// Get professions from backend an insert into select
async function loadProfessions() {
  await $.getJSON('http://sandbox.gibm.ch/berufe.php', function (data) {
    for (i = 0; i < data.length; i++) {
      $('#profession').append(`<option value=${data[i].beruf_id}>${data[i].beruf_name}</option>`);
    }
    $('#profession').selectpicker('refresh');
  });
}

// Get classes from backend an insert into select
async function loadClasses(professionId) {
  await $.getJSON(`http://sandbox.gibm.ch/klassen.php?beruf_id=${professionId}`, function (data) {
    $('#class').empty();
    $('#class').append('<option disabled selected> -- Wähle eine Klasse aus -- </option>');
    for (i = 0; i < data.length; i++) {
      $('#class').append(`<option value=${data[i].klasse_id}>${data[i].klasse_name}</option>`);
    }
    // refresh with new options
    $('#class').selectpicker('refresh');
    // render so that the first option is selected
    $('#class').selectpicker('render');
  });
  $('#classFormGroup').fadeIn();
}

// Get timetable from backend and insert into table
async function loadTimetable() {
  updateWeekText();
  const weekString = getWeekString();
  await $.getJSON(`http://sandbox.gibm.ch/tafel.php?klasse_id=${getFromStorage('classId')}&woche=${weekString}`, function (data) {
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
  $('.table').fadeIn();
  $('.nav').fadeIn();
}

// tries to load selected from local storage
async function loadFromStorage() {
  const professionIdFromStorage = getFromStorage('professionId');
  const classIdFromStorage = getFromStorage('classId');
  const dateFromStorage = getFromStorage('date');
  if (professionIdFromStorage && classIdFromStorage && dateFromStorage) {
    $('#profession').selectpicker('val', professionIdFromStorage);
    await loadClasses(professionIdFromStorage);
    $('#class').selectpicker('val', classIdFromStorage);
    await loadTimetable(classId);
  }
  // if not date is aviable, set today
  if (!dateFromStorage) {
    saveToStorage('date', moment().toISOString());
  }
}

function initListeners() {
  $('#profession').change(function () {
    loadClasses($(this).val());
    saveToStorage('professionId', $(this).val());
  });

  $('#class').change(function () {
    classId = $(this).val();
    saveToStorage('classId', classId);
    loadTimetable();
  });

  $('#weekback').click(function () {
    const date = moment(getFromStorage('date'));
    date.subtract(1, 'week');
    saveToStorage('date', date.toISOString());
    loadTimetable(classId);
  });

  $('#weekforward').click(function () {
    const date = moment(getFromStorage('date'));
    date.add(1, 'week');
    saveToStorage('date', date.toISOString());
    loadTimetable(classId);
  });

  $('#weekText').click(function () {
    saveToStorage('date', moment().toISOString());
    loadTimetable(classId);

    // easterEgg hihi
    buttonPressed();
  });
}
