const workoutList = [];

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

const getDateKey = (year, month, day) => {
    year = year.toString().padStart(4, "0");
    month = (month + 1).toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
};

loadWorkouts();
console.log(workoutList);