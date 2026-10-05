const workName = document.querySelector("#name");
const type = document.querySelector("#type");
const duration = document.querySelector("#duration");
const note = document.querySelector("#note");
const clickEvent = document.querySelector("#create");
const display = document.getElementById("display");
const showAllBtn = document.getElementById("show-all-btn");
const dateInput = document.querySelector("#date");

let selectedDate = null;
const workoutList = [];

showAllBtn.addEventListener("click", () => {
    dateInput.value = "";
    selectedDate = null;
    renderWorkouts();
});

clickEvent.addEventListener("click", () => {
    const now = new Date();
    const selectedDateValue = dateInput.value;

    const workoutObj = {
        workName: workName.value,
        type: type.value,
        duration: duration.value,
        note: note.value,
        date: getDateKey(now.getFullYear(), now.getMonth(), now.getDate()),
        id: Date.now()
    };
    if (selectedDateValue) {
        workoutObj.date = selectedDateValue;
    }

    workoutList.push(workoutObj);
    renderWorkouts();
    saveWorkouts();
    renderCalendar();
});

const renderWorkouts = () => {
    display.innerHTML = "";
    let workoutToShow = workoutList;
    if (selectedDate) {
        workoutToShow = workoutList.filter(workout => workout.date === selectedDate);
    }

    workoutToShow.forEach(workout => {
        const card = document.createElement("div");
        card.className = "workout-card";
        card.innerHTML = `
            <h4>Workout Name: ${workout.workName}</h4>
            <p><strong>Type:</strong> ${workout.type}</p>
            <p><strong>Duration:</strong> ${workout.duration} minutes</p>
            <p><strong>Notes:</strong> ${workout.note}</p>
            <p><strong>Date:</strong> ${workout.date}</p>
            <button class="delete-btn">Delete</button>
        `;

        display.appendChild(card);

        const deleteButton = card.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            const index = workoutList.findIndex(w => w.id === workout.id);
            if (index !== -1) {
                workoutList.splice(index, 1);
                saveWorkouts();
                renderWorkouts();
                renderCalendar();
            }
        });
    });
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
};

const renderCalendar = () => {
    const monthTitle = document.getElementById("month-title");
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
        const dateKey = getDateKey(year, month, day);
        const trained = workoutList.some(workout => workout.date === dateKey);
        const button = document.createElement("button");
        button.textContent = day;
        calenderDays.appendChild(button);

        if (trained) {
            button.classList.add("Completed");
        } else {
            button.classList.add("not-completed");
        }

        button.addEventListener("click", () => {
            selectedDate = dateKey;
            dateInput.value = dateKey;
            renderWorkouts();
            renderCalendar();
        });
    }
};

const getDateKey = (year, month, day) => {
    year = year.toString().padStart(4, "0");
    month = (month + 1).toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

loadWorkouts();
renderWorkouts();
renderCalendar();
