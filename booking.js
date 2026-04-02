let container = document.getElementById("seatContainer");
let selected = [];

let num = 1;

for(let r=1;r<=10;r++){

  for(let i=0;i<2;i++) createSeat(num++);

  let gap = document.createElement("div");
  gap.className = "aisle";
  container.appendChild(gap);

  for(let i=0;i<2;i++) createSeat(num++);
}

function createSeat(n){
  let s = document.createElement("div");
  s.className = "seat";
  s.innerText = n;

  if(Math.random()<0.3) s.classList.add("booked");

  s.onclick = function(){
    if(s.classList.contains("booked")) return;

    s.classList.toggle("selected");

    if(selected.includes(n)){
      selected = selected.filter(x=>x!=n);
    } else selected.push(n);
  }

  container.appendChild(s);
}

function goPay(){
  if(selected.length==0){
    alert("Select seat");
    return;
  }
  window.location.href="payment.html";
}
