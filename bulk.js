var cardLabels = [
  'EX / GX / V / VMAX / ex Cards',
  'Full Art Cards',
  'Commons, Uncommons & Trainers'
];

function calcTotal() {
  var inputs = document.querySelectorAll('.ct-input');
  var total = 0;
  inputs.forEach(function (inp, i) {
    var qty = parseFloat(inp.value) || 0;
    var rate = parseFloat(inp.dataset.rate) || 0;
    var lineVal = qty * rate;
    total += lineVal;
    var el = document.getElementById('line-' + i);
    if (el) {
      if (qty > 0) {
        el.textContent = '$' + lineVal.toFixed(2);
        el.classList.remove('zero');
      } else {
        el.textContent = '—';
        el.classList.add('zero');
      }
    }
  });
  document.querySelector('#result-total span').textContent = total.toFixed(2);
  var low = (total * 0.9).toFixed(2);
  var high = (total * 1.1).toFixed(2);
  var range = document.getElementById('result-range');
  if (total > 0) {
    range.textContent = 'Estimated range: $' + low + ' – $' + high;
  } else {
    range.textContent = 'Enter your card counts above';
  }
  updateSmsLink();
  updateHiddenFields();
}

function updateSmsLink() {
  var inputs = document.querySelectorAll('.ct-input');
  var total = 0;
  var lines = [];
  inputs.forEach(function (inp, i) {
    var qty = parseFloat(inp.value) || 0;
    var rate = parseFloat(inp.dataset.rate) || 0;
    var lineVal = qty * rate;
    total += lineVal;
    if (qty > 0) lines.push(cardLabels[i] + ': ' + qty + ' @ $' + lineVal.toFixed(2));
  });

  var body;
  if (lines.length === 0) {
    body = 'Hi! I\'d like to sell my Pokémon card collection. Can you help?';
  } else {
    body = 'Hi! Bulk estimate from toploadertrading.com:\n' + lines.join('\n') + '\nTotal: ~$' + total.toFixed(2) + '\nCan we arrange a time?';
  }

  document.getElementById('sms-cta').href = 'sms:+12708830151?body=' + encodeURIComponent(body);
}

function updateHiddenFields() {
  var inputs = document.querySelectorAll('.ct-input');
  var total = 0;
  var lines = [];
  inputs.forEach(function (inp, i) {
    var qty = parseFloat(inp.value) || 0;
    var rate = parseFloat(inp.dataset.rate) || 0;
    var lineVal = qty * rate;
    total += lineVal;
    if (qty > 0) lines.push(cardLabels[i] + ': ' + qty + ' cards @ $' + lineVal.toFixed(2));
  });
  var hidTotal = document.getElementById('hid-total');
  var hidBreakdown = document.getElementById('hid-breakdown');
  if (hidTotal) hidTotal.value = total > 0 ? '$' + total.toFixed(2) : 'No estimate entered';
  if (hidBreakdown) hidBreakdown.value = lines.length > 0 ? lines.join(' | ') : 'No card counts entered';
}

// After SMS app opens, redirect the browser to the thank-you page
document.getElementById('sms-cta').addEventListener('click', function () {
  setTimeout(function () {
    window.location.href = 'thank-you.html';
  }, 500);
});
