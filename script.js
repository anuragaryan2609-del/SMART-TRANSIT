function sendOTP(){
  let num = document.getElementById("mobile").value;

  if(num.length != 10){
    alert("Enter valid number");
    return;
  }

  setTimeout(()=>{
    window.location.href = "home.html";
  },1000);
}
