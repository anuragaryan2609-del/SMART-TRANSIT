let bus = document.getElementById("bus");

let position = 0;

setInterval(() => {
  position += 5;
  bus.style.left = position + "%";

  if(position > 90){
    position = 0;
  }
}, 500);
