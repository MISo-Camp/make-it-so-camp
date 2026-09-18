/* Host a camp — tiny JS mailto composer.
   The form is hidden in index.html; JS reveals it so the noscript email fallback
   shows only when JS is unavailable. Composes a structured mailto from the
   three fields — no backend, no third-party, static hosting unchanged. */
function buildMailto(fields) {
  var subject = fields.institution
    ? 'Hosting a MISO Camp — ' + fields.institution
    : 'Hosting a MISO Camp';
  var body = [
    'Institution: ' + fields.institution,
    'Cohort: ' + fields.cohort,
    'Question: ' + fields.question,
    '',
    'Sent from misocamp.com/new'
  ].join('\n');
  return 'mailto:hello@misocamp.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
}

document.getElementById('host-form').removeAttribute('hidden');
document.getElementById('host-camp-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var fields = {
    institution: document.getElementById('institution').value.trim(),
    cohort: document.getElementById('cohort').value.trim(),
    question: document.getElementById('question').value.trim()
  };
  window.location.href = buildMailto(fields);
});
