let generatedOTP = "";

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

function sendOTP() {
  generatedOTP = Math.floor(10000 + Math.random() * 90000);
  alert("Your OTP: " + generatedOTP);

  document.getElementById("otp").innerHTML = `
    <input id="otpInput" placeholder="Enter OTP" style="width:100%;padding:10px;margin:10px 0;border-radius:10px;border:1px solid #ccc;">
    <button class="btn" onclick="verifyOTP()">Verify OTP</button>
  `;
}

function verifyOTP() {
  let userOTP = document.getElementById("otpInput").value;

  if (userOTP == generatedOTP) {
    alert("Login Successful ✅");
    window.location.href = "home.html";
  } else {
    alert("Wrong OTP ❌");
  }
}

function setLang(lang) {
  if (lang === "mr") {
    document.getElementById("title").innerText = "स्मार्ट ट्रान्झिट मध्ये स्वागत आहे";
  } else if (lang === "hi") {
    document.getElementById("title").innerText = "स्मार्ट ट्रांजिट में आपका स्वागत है";
  } else {
    document.getElementById("title").innerText = "Welcome to Smart Transit";
  }
}
