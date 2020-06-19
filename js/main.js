init();

// Init website
async function init() {
  // enable all tooltips
  $('[data-toggle="tooltip"]').tooltip();
  // load professions
  await loadProfessions();
  // load presaved selected values from local storage
  await loadFromStorage();
  // init listeners
  initListeners();
}

// Get professions from backend an insert into select
async function loadProfessions() {
  await $.getJSON('http://sandbox.gibm.ch/berufe.php')
    .done(function (data) {
      for (i = 0; i < data.length; i++) {
        $('#profession').append(`<option value=${data[i].beruf_id}>${data[i].beruf_name}</option>`);
      }
      $('#profession').selectpicker('refresh');
    })
    .fail(function () {
      alert('Fehler beim Abfragen der Daten.');
    });
}

// Get classes from backend an insert into select
async function loadClasses(professionId) {
  await $.getJSON(`http://sandbox.gibm.ch/klassen.php?beruf_id=${professionId}`)
    .done(function (data) {
      $('#class').empty();
      $('#class').append('<option disabled selected> -- Wähle eine Klasse aus -- </option>');
      for (i = 0; i < data.length; i++) {
        $('#class').append(`<option value=${data[i].klasse_id}>${data[i].klasse_name}</option>`);
      }
      // refresh with new options
      $('#class').selectpicker('refresh');
      // render so that the first option is selected
      $('#class').selectpicker('render');
    })
    .fail(function () {
      alert('Fehler beim Abfragen der Daten.');
    });
  // smooth fade in animation
  $('#classFormGroup').fadeIn();
}

// Get timetable from backend and insert into table
async function loadTimetable() {
  updateWeekText();
  const weekString = getWeekString();
  await $.getJSON(`http://sandbox.gibm.ch/tafel.php?klasse_id=${getFromStorage('classId')}&woche=${weekString}`)
    .done(function (data) {
      $('#tableBody').empty();
      for (i = 0; i < data.length; i++) {
        $('#tableBody').append(`
      <tr>
        <td>${formatDate(data[i].tafel_datum)}</td>
        <td>${getWeekday(data[i].tafel_wochentag)}</td>
        <td>${data[i].tafel_von}</td>
        <td>${data[i].tafel_bis}</td>
        <td>${data[i].tafel_lehrer}</td>
        <td>${data[i].tafel_longfach}</td>
        <td>${data[i].tafel_raum}</td>
      </tr>
      `);
      }
      if (data.length === 0) {
        $('#tableBody').append('<tr><td colspan="7">Keine Daten für diese Woche gefunden. Sind vielleicht Ferien?☀️</td></tr>');
      }
    })
    .fail(function () {
      alert('Fehler beim Abfragen der Daten.');
    });

  // smooth fade in animation
  $('.table').fadeIn();
  $('.nav').fadeIn();
}

// tries to load selected values from local storage
async function loadFromStorage() {
  const professionIdFromStorage = getFromStorage('professionId');
  const classIdFromStorage = getFromStorage('classId');
  const dateFromStorage = getFromStorage('date');
  if (professionIdFromStorage && classIdFromStorage && dateFromStorage) {
    $('#profession').selectpicker('val', professionIdFromStorage);
    await loadClasses(professionIdFromStorage);
    $('#class').selectpicker('val', classIdFromStorage);
    await loadTimetable();
  }
  // if not date is aviable, set today
  if (!dateFromStorage) {
    saveToStorage('date', moment().toISOString());
  }
}

// listen to select changes and button clicks
function initListeners() {
  $('#profession').change(function () {
    loadClasses($(this).val());
    saveToStorage('professionId', $(this).val());
    removeFromStorage('classId');
    $('.table').hide();
    $('.nav').hide();
  });

  $('#class').change(function () {
    saveToStorage('classId', $(this).val());
    // reset date to today
    saveToStorage('date', moment().toISOString());
    loadTimetable();
  });

  $('#weekback').click(async function () {
    const date = moment(getFromStorage('date'));
    date.subtract(1, 'week');
    saveToStorage('date', date.toISOString());

    $('#weekback').prop('disabled', true);
    $('#tableDiv').fadeOut(100);
    await wait(100);
    loadTimetable();
    $('#tableDiv').fadeIn(100);
    await wait(100);
    $('#weekback').prop('disabled', false);
  });

  $('#weekforward').click(async function () {
    const date = moment(getFromStorage('date'));
    date.add(1, 'week');
    saveToStorage('date', date.toISOString());

    $('#weekforward').prop('disabled', true);
    $('#tableDiv').fadeOut(100);
    await wait(100);
    loadTimetable();
    $('#tableDiv').fadeIn(100);
    await wait(100);
    $('#weekforward').prop('disabled', false);
  });

  $('#weekText').click(function () {
    saveToStorage('date', moment().toISOString());
    loadTimetable();

    // easterEgg :)
    buttonPressed();
  });
}
