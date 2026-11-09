
const weekdays = document.getElementById('week');


const renderWeek = () => {

  weekdays.innerHTML = '';
  
  const days = new Date().getDay();
  const monOffset = (days + 6) % 7;

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - monOffset + i);
    const dateKey = getDateKey(date.getFullYear(), date.getMonth(), date.getDate());

    const dayWorkouts = workoutList.filter(workout => workout.date == dateKey);

    console.log(dateKey);
    console.log(workoutList[0]);

    const dayCard = document.createElement('div');
    dayCard.className = "day-card";
    dayCard.innerHTML = `
    <p><b>${date.toLocaleDateString('en-US', { weekday: 'long' })}</b></p>`;
    dayCard.innerHTML += `<p style='color: var(--stone)'>${date.toLocaleDateString('en-US', {day: 'numeric', month: 'short' })}</p>`;
    
    if (dayWorkouts.length <= 0 ) {
      dayCard.innerHTML += "<p class='rest-day'>Rest Day</p>";
  }
  else {

       let list = '<ul class="day-workouts">';
       dayWorkouts.forEach(workout => {
       const count = (workout.exercises || []).length;
    list += `
        <li class="workout-pill">
            <b>${workout.workName}</b>
            <span>${workout.type} 
            <br>
            ${workout.duration} min <br> ${count} 
            exercises</span>
        </li>`;
});
list += '</ul>';
dayCard.innerHTML += list;
  }
  weekdays.appendChild(dayCard);
  }


};



renderWeek();





