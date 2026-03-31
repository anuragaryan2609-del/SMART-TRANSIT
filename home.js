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

  // generate 50 buses
  for(let i=1;i<=50;i++){
    let time = Math.floor(Math.random()*24)+":00";
    let price = Math.floor(Math.random()*500)+200;

    results.innerHTML += `
      <div class="bus-card">
        🚌 Bus #${100+i} <br>
        ${from} → ${to} <br>
        Time: ${time} <br>
        Price: ₹${price}
      </div>
    `;
  }
}
