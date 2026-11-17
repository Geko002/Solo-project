const details = document.getElementById("workout-details");
const exerciseList = document.getElementById("exercise-list");

const params = new URLSearchParams(location.search);
const id = params.get("id");

const workout = workoutList.find(w => w.id === Number(id));


const renderWorkoutDetails = () => {
    details.innerHTML = "";                       

    const cards = document.createElement("div");
    cards.className = "workout-details-card";
    cards.innerHTML = `
    <h2>${workout.workName}</h2>
    <p>Type: ${workout.type}</p>
    <p>Duration: ${workout.duration} minutes</p>
    <p>Date: ${workout.date}</p>
    <p>Note: ${workout.note}</p>
    <p>Total Exercises: ${(workout.exercises || []).length}</p>
        <h3>Exercises:</h3>
    `;

    details.appendChild(cards);


    exerciseList.innerHTML = "";


    (workout.exercises || []).forEach(exercise => {
        const exCard = document.createElement("div");
        exCard.className = "exercise-card";
        exCard.innerHTML = `
        <p><strong>${exercise.name}</strong></p>
        <p>Sets: ${exercise.sets}</p>
        <p>Reps: ${exercise.reps}</p>
        <p>Rest: ${exercise.rest} seconds</p>
        <hr>
        `;
        exerciseList.appendChild(exCard);
    });
};


if (workout) {
  renderWorkoutDetails();
}
else {
    details.innerHTML = "<p>Workout not found.</p>";
    exerciseList.innerHTML = "";
}
  