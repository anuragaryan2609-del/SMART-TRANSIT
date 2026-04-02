function showMobile(){
  document.getElementById("mobileBox").style.display = "block";
  document.getElementById("emailBox").style.display = "none";
}

function showEmail(){
  document.getElementById("mobileBox").style.display = "none";
  document.getElementById("emailBox").style.display = "block";
}

function sendOTP(){
  let num = document.getElementById("mobile").value;

  if(num.length != 10){
    alert("Enter valid number");
    return;
  }

  document.getElementById("otpBox").style.display = "block";
}

function verifyOTP(){
  let otp = document.getElementById("otp").value;

  if(otp.length == 5){
    alert("Login Success ✅");
    window.location.href = "home.html";
  } else {
    alert("Invalid OTP");
  }
}

function loginEmail(){
  let email = document.getElementById("email").value;

  if(email.includes("@")){
    alert("Login Success ✅");
    window.location.href = "home.html";
  } else {
    alert("Invalid Email");
  }
}
