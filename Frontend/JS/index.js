
const weekdays = document.getElementById('week');


const renderWeek = () => {

  weekdays.innerHTML = '';
  
  const days = new Date().getDay();
  const monOffset = (days + 6) % 7;

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - monOffset + i);
    const dateKey = getDateKey(date.getFullYear(), date.getMonth() + 1, date.getDate());

    const dayWorkouts = workoutList.filter(workout => workout.dateKey === dateKey);

    const dayCard = document.createElement('div');
    dayCard.innerHTML = `
    <h3>${date.toDateString()}</h3>`;

    if (dayWorkouts.length <= 0 ) {
      dayCard.innerHTML += `<p>No workouts scheduled</p>`;
  }
  else {
    dayCard.innerHTML += '<ul>';
    dayWorkouts.forEach(workout => {
      dayCard.innerHTML += `<li>${workout.name}</li>`;
    });
    dayCard.innerHTML += '</ul>';
  }
  weekdays.appendChild(dayCard);
  }


};



renderWeek();

console.log(dateKey);
console.log(workoutList[0]);





