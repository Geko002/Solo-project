
const workName = document.querySelector("#name");
const type = document.querySelector("#type");
const duration = document.querySelector("#duration");
const note = document.querySelector("#note");
const clickEvent = document.querySelector("#create");
const display = document.getElementById("display");


const workoutList = [];

clickEvent.addEventListener("click", () => {

    const now = new Date();


const workoutObj = {
    workName: workName.value,
    type: type.value,
    duration: duration.value,
    note: note.value,
    date: getDateKey(now.getFullYear(), now.getMonth(), now.getDate())
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

const renderCalendar = () => {

    const monthTitle =  document.getElementById("month-title");
    const calenderDays = document.getElementById("calendar-days");
    calenderDays.innerHTML = "";


    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    monthTitle.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;

    const offset = (firstDay + 6) % 7;

    for (let i = 0; i < offset; i++) {
        const emptyDiv = document.createElement("div");
        calenderDays.appendChild(emptyDiv);
    }

    const daysinMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysinMonth; day++) {

    const button = document.createElement("button");
    button.textContent = day;
    calenderDays.appendChild(button);

    }

}

const getDateKey = (year, month, day) => {
    year = year.toString().padStart(4, "0");
    month = (month + 1).toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
}



loadWorkouts();
renderWorkouts();
renderCalendar();



