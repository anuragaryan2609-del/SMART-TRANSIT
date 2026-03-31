let container = document.getElementById("seatContainer");

let selectedSeats = [];
let price = 300;

// create 10 rows (total 40 seats)
let seatNumber = 1;

for(let row=1; row<=10; row++){

  // LEFT SIDE (2 seats)
  for(let i=0; i<2; i++){
    createSeat(seatNumber++);
  }

  // AISLE
  let aisle = document.createElement("div");
  aisle.classList.add("aisle");
  container.appendChild(aisle);

  // RIGHT SIDE (2 seats)
  for(let i=0; i<2; i++){
    createSeat(seatNumber++);
  }
}

function createSeat(num){
  let seat = document.createElement("div");
  seat.classList.add("seat");
  seat.innerText = num;

  // random booked
  if(Math.random() < 0.3){
    seat.classList.add("booked");
  }

  seat.onclick = function(){

    if(seat.classList.contains("booked")) return;

    if(seat.classList.contains("selected")){
      seat.classList.remove("selected");
      selectedSeats = selectedSeats.filter(s => s != num);
    } else {
      seat.classList.add("selected");
      selectedSeats.push(num);
    }

    update();
  }

  container.appendChild(seat);
}

function update(){
  document.getElementById("selectedSeats").innerText =
    selectedSeats.length ? selectedSeats.join(", ") : "None";

  document.getElementById("totalPrice").innerText =
    selectedSeats.length * price;
}

function goPayment(){
  if(selectedSeats.length === 0){
    alert("Select at least 1 seat");
    return;
  }
  window.location.href = "payment.html";
}
