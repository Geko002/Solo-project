// Input event test for workout calender display 

const workName = document.querySelector("#name");
const type = document.querySelector("#type");
const duration = document.querySelector("#duration");
const note = document.querySelector("#note");
const clickEvent = document.querySelector("#create");
const display = document.getElementById("display");


const workoutList = [];

clickEvent.addEventListener("click", () => {


const workoutObj = {
    workName: workName.value,
    type: type.value,
    duration: duration.value,
    note: note.value
};

workoutList.push(workoutObj);
renderWorkouts();
saveWorkouts();

});


const renderWorkouts = () => {
    display.innerHTML = "";


    for (let i = 0; i < workoutList.length; i++) {

    const card = document.createElement("div");

    card.className = "workout-card";

    card.innerHTML = `
        <h4>Workout Name: ${workoutList[i].workName}</h4>

        <p><strong>Type:</strong> ${workoutList[i].type}</p>
        <p><strong>Duration:</strong> ${workoutList[i].duration} minutes</p>
        <p><strong>Notes:</strong> ${workoutList[i].note}</p>

        <button>PLAN OVERVIEW</button>
        <button style="background-color: crimson; color: white;" class="delete-btn">DELETE</button> 
    `;
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
    workoutList.splice(i, 1);
    renderWorkouts();
    saveWorkouts();

});

    display.appendChild(card);
    }
};

const saveWorkouts = () => {
    localStorage.setItem("workouts", JSON.stringify(workoutList));
};

const loadWorkouts = () => {
    const loadExcercise = localStorage.getItem("workouts");
    if (loadExcercise) {
        const parsedWorkouts = JSON.parse(loadExcercise);
        workoutList.push(...parsedWorkouts);
    }

}


loadWorkouts();
renderWorkouts();



