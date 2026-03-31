// 200+ cities
let cities = [
"Mumbai","Pune","Nashik","Nagpur","Sambhaji Nagar","Kolhapur","Satara",
"Solapur","Latur","Amravati","Jalgaon","Ratnagiri","Sindhudurg",
"Ahmednagar","Dhule","Nanded","Wardha","Yavatmal","Akola","Buldhana","Ahilyanagar"
];

// add fake cities
for(let i=1;i<=200;i++){
  cities.push("City"+i);
}

// fill datalist
let list = document.getElementById("cities");
cities.forEach(city=>{
  let option = document.createElement("option");
  option.value = city;
  list.appendChild(option);
});

// NAVIGATION
function go(page){
  window.location.href = page;
}

// SEARCH FUNCTION
function searchBus(){

  let from = document.getElementById("from").value;
  let to = document.getElementById("to").value;

  if(!from || !to){
    alert("Enter both locations");
    return;
  }

  let results = document.getElementById("results");
  results.innerHTML = "<h3>Available Buses</h3>";

  for(let i=1;i<=50;i++){

    let hours = Math.floor(Math.random()*24);
    let mins = Math.floor(Math.random()*60);
    let time = `${hours}:${mins < 10 ? '0'+mins : mins}`;

    let price = Math.floor(Math.random()*500)+200;

    let busNo = "MH15KW" + Math.floor(1000 + Math.random()*9000);

    results.innerHTML += `
      <div class="bus-card">
        <b>🚌 ${busNo}</b><br>
        ${from} → ${to} <br>
        🕒 Departure: ${time} <br>
        💺 Seats Available: ${Math.floor(Math.random()*40)+10} <br>
        💰 Price: ₹${price}
      </div>
    `;
  }
}
