let c=document.getElementById("seatContainer");
let selected=[];

let num=1;

for(let r=1;r<=10;r++){
  for(let i=0;i<2;i++) create(num++);
  let gap=document.createElement("div");
  gap.className="aisle";
  c.appendChild(gap);
  for(let i=0;i<2;i++) create(num++);
}

function create(n){
  let s=document.createElement("div");
  s.className="seat";
  s.innerText=n;

  if(Math.random()<0.3)s.classList.add("booked");

  s.onclick=function(){
    if(s.classList.contains("booked"))return;
    s.classList.toggle("selected");
  }

  c.appendChild(s);
}

function goPay(){
  window.location="payment.html";
}
