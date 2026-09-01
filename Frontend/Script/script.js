/*let person = {
  name: "Geko", 
  age: 24, 
  natio: "Kurdish",
  height: 178,
  acts : ["Football", "Basketball", "Dancing", "Tur i parken"],
  actBlog: function(){
    console.log("Answer :");
    this.acts.forEach(i => {
      console.log(i);
    });

  },
  logBlog: (park) => {
    park += "Frogner Parken"
    console.log(`I went to ${park} today`);
  },
};

for(let i in person) {
  console.log(person[i]);
};
*/
/*
const title = document.querySelector("h1");

let me = document.getElementById("gg");
console.log(me);

let buttons = document.querySelector("#click-me");
console.log(`this happend: ${buttons}`);

const element = document.querySelector("#click");
let here = "<h1>well this got better!</h1>";
element.addEventListener("click", () => {
  console.log("The click button worked");
  document.body.innerHTML += here;
  title.textContent = "This got better!";
});
*/

/*const heading = document.querySelector("#title");
const element = document.querySelector("#click");
let change = "<h1> This needs to change </h1>";
element.addEventListener("click", () => {
  console.log("Test button");
  heading.innerHTML = change;
});

*/

// - Button prep for RIKKE - <3

const clickEvent = document.getElementById("click-me");
const element = document.getElementById("display");

clickEvent.addEventListener("click", () => {

    if (element.classList.contains("open")) {

        element.classList.remove("open");

    } else {

        element.classList.add("open");

    }

});