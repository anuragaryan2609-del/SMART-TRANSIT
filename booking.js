let container = document.getElementById("seatContainer");

let selectedSeats = [];
let price = 300;

// create 40 seats (2x2 layout)
for(let i=1;i<=40;i++){

  let seat = document.createElement("div");
  seat.classList.add("seat");
  seat.innerText = i;

  // aisle gap
  if(i % 4 === 3){
    let gap = document.createElement("div");
    gap.classList.add("aisle");
    container.appendChild(gap);
  }

  // random booked
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
  localStorage.setItem("seats", selectedSeats);
  localStorage.setItem("amount", selectedSeats.length * price);
  window.location.href = "payment.html";
}
