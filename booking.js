let seatContainer = document.getElementById("seatContainer");

let selectedSeats = [];
let pricePerSeat = 300;

// create 40 seats
for(let i=1;i<=40;i++){

  let seat = document.createElement("div");
  seat.classList.add("seat");
  seat.innerText = i;

  // random booked seats
  if(Math.random() < 0.3){
    seat.classList.add("booked");
  }

  seat.onclick = function(){

    if(seat.classList.contains("booked")) return;

    if(seat.classList.contains("selected")){
      seat.classList.remove("selected");
      selectedSeats = selectedSeats.filter(s => s != i);
    } else {
      seat.classList.add("selected");
      selectedSeats.push(i);
    }

    updateSummary();
  }

  seatContainer.appendChild(seat);
}

function updateSummary(){
  document.getElementById("selectedSeats").innerText = 
    selectedSeats.length ? selectedSeats.join(", ") : "None";

  document.getElementById("totalPrice").innerText = 
    selectedSeats.length * pricePerSeat;
}
