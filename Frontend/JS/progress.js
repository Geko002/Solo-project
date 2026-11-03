const weekCount = document.getElementById('week-count');
const minutesCount = document.getElementById('minutes-count');
const streakCount = document.getElementById('streak-count');

const updateList = [];

const updateProgress = () => {

    let total = 0;
    const daysCount = new Date().getDay();
    const weeks = new Date().getWeek();
    const min = new Date().getMinutes();
    const dateKey = getDateKey(new Date().getWeek(), new Date().getDay(), new Date().getMinutes());
    
    const monOffset = (daysCount + 6) % 7;

    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        const currentDateKey = getDateKey(currentDate.getWeek(), currentDate.getDay(), currentDate.getMinutes());

 
}
console.log(updateList);

