function loadClasses() {
  $.get('http://sandbox.gibm.ch/berufe.php', function (data) {
    console.log(data);
    for (i = 0; i < data.length; i++) {
      $('.form-control').append(`<option>${data[i].beruf_name}</option>`);
    }
  });
}

loadClasses();
