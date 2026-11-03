const weekCount = document.getElementById('week-count');
const minutesCount = document.getElementById('minutes-count');
const streakCount = document.getElementById('streak-count');

const updateList = [];

const updateProgress = () => {

const mondayOffset = (new Date().getDay() + 6) % 7;    
    for (let i = 0; i < 7; i++) {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() - mondayOffset + i);
    const dayKey = getDateKey(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());

    updateList.push(dayKey);

}

    const filtered = workoutList.filter(item => updateList.includes(item.date));
    if (filtered.length > 0) {
        weekCount.textContent = filtered.length;
         filtered.length;
    }
    console.log(filtered);
}
updateProgress();