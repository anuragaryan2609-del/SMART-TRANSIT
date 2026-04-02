let busList = document.getElementById("busList");

function addBus(){
  let busNo = document.getElementById("busNo").value;

  if(!busNo){
    alert("Enter bus number");
    return;
  }

  let li = document.createElement("li");
  li.innerText = busNo;

  busList.appendChild(li);

  document.getElementById("busNo").value = "";
}
