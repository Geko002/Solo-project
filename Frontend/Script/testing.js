const n = document.querySelector("#name");
const p = document.querySelector("#passwd");
const d = document.querySelector("#display");
const addButton = document.getElementById("but");

addButton.addEventListener("click", () => {
  d.textContent = `Name is: ${n.value}`;
  d.textContent += `Password : ${p.value}`;
  console.log("Logged into console!");
});