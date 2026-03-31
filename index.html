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

let generatedOTP = "";
let timer = 30;
let interval;

function sendOTP() {
  let mobile = document.getElementById("mobile")?.value;
  let email = document.getElementById("emailInput")?.value;

  // Mobile validation
  if (mobile !== undefined && mobile !== "") {
    if (!/^[0-9]{10}$/.test(mobile)) {
      showPopup("❌ Enter valid 10-digit mobile number");
      return;
    }
  }

  // Email validation
  if (email !== undefined && email !== "") {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showPopup("❌ Enter valid email address");
      return;
    }
  }

  generatedOTP = Math.floor(10000 + Math.random() * 90000);

  showPopup("📩 Your OTP: " + generatedOTP);

  document.getElementById("otp").innerHTML = `
    <input id="otpInput" placeholder="Enter OTP" class="otp-input"/>
    <button class="btn" onclick="verifyOTP()">Verify OTP</button>

    <p id="timerText">Resend OTP in 30s</p>
    <button id="resendBtn" class="outline-btn" disabled onclick="resendOTP()">Resend OTP</button>
  `;

  startTimer();
}

  startTimer();
}
function verifyOTP() {
  let userOTP = document.getElementById("otpInput").value;

  if (userOTP == generatedOTP) {
    showPopup("✅ Login Successful");
    setTimeout(() => {
      window.location.href = "home.html";
    }, 1000);
  } else {
    showPopup("❌ Wrong OTP");
  }
}

function setLang(lang, btn) {

  // remove active from all
  document.querySelectorAll('.lang-toggle button')
    .forEach(b => b.classList.remove('active'));

  // add active to clicked button
  btn.classList.add('active');

  // change language text
  if (lang === "mr") {
    document.getElementById("title").innerText = "स्मार्ट ट्रान्झिट मध्ये स्वागत आहे";
  } else if (lang === "hi") {
    document.getElementById("title").innerText = "स्मार्ट ट्रांजिट में आपका स्वागत है";
  } else {
    document.getElementById("title").innerText = "Welcome to Smart Transit";
  }
}

function startTimer() {
  timer = 30;
  const timerText = document.getElementById("timerText");
  const resendBtn = document.getElementById("resendBtn");

  interval = setInterval(() => {
    timer--;
    timerText.innerText = "Resend OTP in " + timer + "s";

    if (timer <= 0) {
      clearInterval(interval);
      timerText.innerText = "You can resend OTP";
      resendBtn.disabled = false;
    }
  }, 1000);
}

function resendOTP() {
  sendOTP();
}

function showPopup(message) {
  let popup = document.getElementById("popup");
  popup.innerText = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}
