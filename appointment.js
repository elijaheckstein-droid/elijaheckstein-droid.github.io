function submitForm(e) {
  e.preventDefault();
  var form = document.getElementById('appt-form');
  var data = new FormData(form);
  var subject = 'Appointment Request — ' + (data.get('name') || 'Customer');
  var body = 'Name: ' + (data.get('name') || '') +
    '%0APhone: ' + (data.get('phone') || '') +
    '%0AEmail: ' + (data.get('email') || '') +
    '%0ALocation: ' + (data.get('location') || '') +
    '%0ACard Type: ' + (data.get('card_type') || '') +
    '%0AAvailability: ' + (data.get('availability') || '') +
    '%0ANotes: ' + (data.get('notes') || '');
  window.location.href = 'mailto:info@toploadertrading.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
  form.style.display = 'none';
  document.getElementById('success-msg').style.display = 'block';
}
