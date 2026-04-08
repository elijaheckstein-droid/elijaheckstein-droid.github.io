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
  updateEmailLink();
  updateSmsLink();
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

  document.getElementById('sms-cta').href = 'sms:+12703143538?body=' + encodeURIComponent(body);
}

function updateEmailLink() {
  var inputs = document.querySelectorAll('.ct-input');
  var total = 0;
  var lines = [];
  inputs.forEach(function (inp, i) {
    var qty = parseFloat(inp.value) || 0;
    var rate = parseFloat(inp.dataset.rate) || 0;
    var lineVal = qty * rate;
    total += lineVal;
    if (qty > 0) {
      lines.push(cardLabels[i] + ': ' + qty + ' cards @ $' + rate.toFixed(2) + ' ea = $' + lineVal.toFixed(2));
    }
  });

  var subject = 'Bulk Collection Estimate — Toploader Trading Co.';
  var body;
  if (lines.length === 0) {
    body = 'Hi! I\'d like to sell my Pokémon card collection. Please get in touch to discuss.';
  } else {
    body = 'Hi! Here\'s my bulk card estimate from your website:\n\n'
      + lines.join('\n')
      + '\n\nEstimated Total: $' + total.toFixed(2)
      + '\n\nPlease get in touch to arrange a time. Thanks!';
  }

  document.getElementById('email-cta').href =
    'mailto:info@toploadertrading.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}
