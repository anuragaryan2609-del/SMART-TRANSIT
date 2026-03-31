function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  if (tab === 'otp') {
    document.querySelectorAll('.tab')[0].classList.add('active');
    document.getElementById('otp').classList.add('active');
  } else {
    document.querySelectorAll('.tab')[1].classList.add('active');
    document.getElementById('email').classList.add('active');
  }
}

/* Fake login redirect */
function goToHome() {
  window.location.href = "home.html";
}
