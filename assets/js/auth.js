/* ══════════════════════════════════════════════════════════════════════════
   Auth page handlers — inlined verbatim into every generated auth page.
   Demo only: fake validation, no real request is ever sent.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  function toastOk(msg) { showToast('success', msg); }
  function toastErr(msg) { showToast('error', msg); }

  function setValidity(input, ok) {
    input.classList.toggle('is-invalid', !ok);
  }

  const form = document.getElementById('auth-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll('input[required]').forEach(function (inp) {
        const v = inp.value.trim();
        const good = v !== '' && (inp.type !== 'email' || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));
        setValidity(inp, good);
        if (!good) ok = false;
      });
      const p1 = document.getElementById('reg-pass');
      const p2 = document.getElementById('reg-cfpass');
      if (p1 && p2 && p1.value !== p2.value) { setValidity(p2, false); ok = false; }
      const otp = form.querySelectorAll('.otp-box');
      if (otp.length) {
        const filled = Array.prototype.every.call(otp, function (b) { return b.value.trim() !== ''; });
        otp.forEach(function (b) { setValidity(b, filled); });
        if (!filled) ok = false;
      }
      if (ok) toastOk('All good — this is a demo, no request was sent.');
      else toastErr('Please fix the highlighted fields.');
    });
  }

  const otpBoxes = document.querySelectorAll('.otp-box');
  otpBoxes.forEach(function (box, i, arr) {
    box.addEventListener('input', function () {
      box.value = box.value.replace(/\D/g, '').slice(0, 1);
      if (box.value && arr[i + 1]) arr[i + 1].focus();
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !box.value && arr[i - 1]) arr[i - 1].focus();
    });
    box.addEventListener('paste', function (e) {
      e.preventDefault();
      const digits = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, arr.length);
      arr.forEach(function (b, j) { b.value = digits[j] || ''; });
      arr[Math.min(digits.length, arr.length - 1)].focus();
    });
  });

  function armResend(btn) {
    let n = 30;
    const label = btn.dataset.resend || btn.textContent;
    btn.disabled = true;
    btn.innerHTML = label + ' (' + n + 's)';
    toastOk(label + ' — check your inbox');
    const t = setInterval(function () {
      n--;
      btn.innerHTML = label + ' (' + n + 's)';
      if (n <= 0) {
        clearInterval(t);
        btn.disabled = false;
        btn.innerHTML = label;
      }
    }, 1000);
  }
  document.querySelectorAll('[data-resend]').forEach(function (btn) {
    btn.addEventListener('click', function () { armResend(btn); });
  });
  document.querySelectorAll('.resend-link').forEach(function (el) {
    el.addEventListener('click', function () { toastOk('A new code was sent to your device'); });
  });
})();
