
const workoutContainer = document.querySelector('.workout-container');
const weekdays = document.querySelector('.weekdays');


const renderIndex = () => {
  workoutContainer.innerHTML = '';
  workoutList.forEach(workout => {
    const workoutCard = document.createElement('div');
    workoutCard.classList.add('workout-card');
    workoutCard.innerHTML = `
      <div class="tittel">${workout.title}</div>
      <div class="content">${workout.content}</div>
    `;
    workoutContainer.appendChild(workoutCard);
  });
};

const renderWeekdays = () => {
  const days = new Date().getDay();
  const monOffset = (days + 6) % 7;

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - monOffset + i);
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = date.toDateString();
    weekdays.appendChild(dayElement);
  }
};




renderWeekdays();
renderIndex();




console.log(workoutList);



