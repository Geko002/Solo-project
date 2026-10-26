const workName = document.querySelector("#name");
const type = document.querySelector("#type");
const duration = document.querySelector("#duration");
const note = document.querySelector("#note");
const clickEvent = document.querySelector("#create");
const display = document.getElementById("display");
const showAllBtn = document.getElementById("show-all-btn");
const dateInput = document.querySelector("#date");
 
 
 
let selectedDate = null;
let openId = null;
 
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
        id: Date.now(),
        exercises: []
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
        const isOpen = openId === workout.id;
        const exerciseCount = (workout.exercises || []).length;
        const card = document.createElement("div");
        card.className = "workout-card";
        
        card.innerHTML = `


            <p><Strong>${workout.workName}</Strong> <br> Total: ${exerciseCount} exercises</p>
            <hr>
            <p><strong>Type:</strong> ${workout.type}</p>
            <p><strong>Duration:</strong> ${workout.duration} minutes</p>
            <p><strong>Notes:</strong> ${workout.note}</p>
            <p><strong>Date:</strong> ${workout.date}</p>
            <div class="ex-box">
                <b>Exercises:</b>
                <div class="ex-list"></div>
                <div class="ex-form"></div>
            </div>
            <div class="card-buttons">
            <button class="show-ex-btn">+ Add Exercise</button>
            <button class="delete-btn">Delete LOG</button>
            </div>
        `;

    if (isOpen) {

        card.querySelector(".show-ex-btn").textContent = isOpen ?  
        "Close" : "+ Add Exercise";
        if(isOpen){
            card.querySelector(".show-ex-btn").classList.add("is-open");
        }
 
         card.querySelector(".ex-form").innerHTML = `
                <input class="ex-name" placeholder="Exercise">
                <input class="ex-sets" type="number" placeholder="Sets">
                <input class="ex-reps" type="number" placeholder="Reps">
                <input class="ex-rest" type="number" placeholder="Rest (s)">
                <button class="add-ex-btn">Add Exercise</button>
            `;
    }
    
        const exList = card.querySelector(".ex-list");

        if(exerciseCount === 0){
            exList.textContent = "No exercises added.";
        }

        (workout.exercises || []).forEach(ex => {
            
            const exRow = document.createElement("div");
            exRow.className = "ex-row";
            exRow.innerHTML = `${ex.name} · 
            <span class="sets-left">${ex.sets}</span> × ${ex.reps} ·
            <span class="timer">${ex.rest}</span> s 
            <button class="delete-ex-btn">✕</button>
            <button class="play-btn">▶</button>`;            
            exList.appendChild(exRow);

            const playButton = exRow.querySelector(".play-btn");
            const timer = exRow.querySelector(".timer");
            const leftSets = exRow.querySelector(".sets-left");
            const deleteExButton = exRow.querySelector(".delete-ex-btn");

            deleteExButton.addEventListener("click", () => {
                const exIndex = workout.exercises.findIndex(e => workout.exercises.indexOf(e));
                if (exIndex !== -1) {
                    workout.exercises.splice(exIndex, 1);
                     saveWorkouts();
                     renderWorkouts();
                }
               console.log("Exercise deleted", workout.exercises);
            });
        let countDown = ex.rest;
        let setsLeft = ex.sets;
        let timerId = null;
        

        playButton.addEventListener("click", () => {
             if (timerId) {
                        clearInterval(timerId);
                        timerId = null;
                        playButton.textContent = "▶";
                    }
                    else{
                            timerId = setInterval(() => {
                            countDown = countDown - 1;
                            timer.textContent = countDown;

                            if (countDown === 0) {
                                clearInterval(timerId);
                                setsLeft = setsLeft - 1;
                               
                               
                                if (setsLeft === 0) {
                                    clearInterval(timerId);
                                    timerId = null;
                                    playButton.disabled = true;
                                }

                                else{
                                    playButton.textContent = "▶";
                                }

                                leftSets.textContent = setsLeft;
                                countDown = ex.rest;
                                timer.textContent = countDown;
                                timerId = null;
                                console.log("Time countdown done");

                            }
                        
                        
                        }, 1000);
                        playButton.textContent = "⏸";
                    }

        });

       });
        
 
        display.appendChild(card);
 
        const showExBtn = card.querySelector(".show-ex-btn");
        showExBtn.addEventListener("click", () => {
            if (openId === workout.id) {
                openId = null;
            } else {
                openId = workout.id;
            }
            renderWorkouts();
        });
 
        const deleteButton = card.querySelector(".delete-btn");
 
        deleteButton.addEventListener("click", () => {
        const index = workoutList.findIndex(w => w.id === workout.id)
 
        if (index !== -1) {
                workoutList.splice(index, 1);
                saveWorkouts();
                renderWorkouts();
                renderCalendar();
            }
        });
 
        if (isOpen) {
            const exName = card.querySelector(".ex-name");
            const exSets = card.querySelector(".ex-sets");
            const exReps = card.querySelector(".ex-reps");
            const exRest = card.querySelector(".ex-rest");
            const addExBtn = card.querySelector(".add-ex-btn");
      
 
            addExBtn.addEventListener("click", () => {
                const exercise = {
                    name: exName.value,
                    sets: Number(exSets.value),
                    reps: Number(exReps.value),
                    rest: Number(exRest.value)
                };
 
                if (!workout.exercises) {
                    workout.exercises = [];
                }
                workout.exercises.push(exercise);
                saveWorkouts();
                renderWorkouts();
            });
        }
 
    });
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
            dateInput.value = dateKey;
            renderWorkouts();
            renderCalendar();
        });
    }
};
 
 
 
 
 
renderWorkouts();
renderCalendar();