
const clickEvent = document.getElementById('but');

const na = document.getElementById("name");
const ag = document.getElementById("num");

const preview = document.getElementById("prev");

clickEvent.addEventListener("click", () => {
   preview.textContent = `name : ${na.value}
   age : ${ag.value}`
});