// Hints/content for each day of the advent calendar
const hints = {
    1: "In dem Schuhkasten(dein Teil)", // Краска для фигурок
    2: "In dem Kallax", // Протеиновый батончик
    3: "Im Kühlschrank", // Kinder Hippo (2 шт.)
    4: "Kannst du mir eine Packung Taschentücher bringen?", // Магниты 40K
    5: "In dem Trockner", // Носки 
    6: "In der Mikrowelle", // Knoppers (3)
    7: "Schwarze Wandregale", // Monster энергетик
    8: "In deinem Mal-Tisch", // Вафли Manner
    9: "Frag mal die Monstera, sie weißt es sicher", // Руины для 40K
    10: "Mein Nachttisch, 2 Schublade", // Knoppers (3)
    11: "Bei deinen Unfug-Klamotten", // Подставка для покраски 
    12: "Bei dem Airfryer", // Kinder Hippo (2 шт.)
    13: "Haben wir genug Nudeln?", // Марципан
    14: "Dein Nachttisch", // Вазелин для губ
    15: "Hinter deinem PC", // Reeces
    16: "Garderobenpaneel, oben", // Джерки или салями
    17: "Unter dem Bett", // Green Stuff для 40K
    10: "Schau dir den Esstisch genauer an", // Kinder Hippo (2 шт.)
    19: "Bei dem Staubsauger", // Вафли Manner
    20: "Da, wo die Medikamente liegen", // Протеиновый батончик
    21: "Eingangstür", // // Knoppers (3)
    22: "Unter dem Couch", // Vitamin Getränk
    23: "Bei den Handtüchern", // Носки
    24: "Weihnachtbaum" // Kinder Bueno
};

function startCountdowns() {
    const countdowns = [
        // Countdown ends at the end of November 30, 2025.
        { id: 3, date: new Date('2025-11-30T23:59:59') }
    ];

    const countdownSection = document.querySelector('.countdown-section');
    const calendarSection = document.querySelector('.calendar');
    
    // Hide the calendar by default until the countdown finishes.
    calendarSection.style.display = 'none';

    function updateCountdowns() {
        const now = new Date();
        let countdownFinished = true;

        countdowns.forEach(countdown => {
            const difference = countdown.date - now;

            if (difference > 0) {
                countdownFinished = false; 
                
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                // Update the countdown display
                document.getElementById(`days${countdown.id}`).textContent = days;
                document.getElementById(`hours${countdown.id}`).textContent = hours;
                document.getElementById(`minutes${countdown.id}`).textContent = minutes;
                document.getElementById(`seconds${countdown.id}`).textContent = seconds; 
                
            } else {
                // Countdown finished, set to 0
                document.getElementById(`days${countdown.id}`).textContent = '0';
                document.getElementById(`hours${countdown.id}`).textContent = '0';
                document.getElementById(`minutes${countdown.id}`).textContent = '0';
            }
        });

        // Show/hide logic
        if (countdownFinished) {
            // Countdown ended
            countdownSection.style.display = 'none';
            calendarSection.style.display = 'grid'; // Show the calendar
        } else {
            // Countdown ongoing
            countdownSection.style.display = 'block'; 
            calendarSection.style.display = 'none'; // Hide the calendar
        }
    }

    updateCountdowns();
    setInterval(updateCountdowns, 1000); 
}

// Add event listener to start the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', startCountdowns);


/* DOOR LOGIC */
const doors = document.querySelectorAll('.door');
const messageElement = document.getElementById('message');

const today = new Date();

/* TEST */
/* const TEST_DAY_OF_MONTH = 5; 
const TEST_MONTH = 11; */

// Get the real day and month from the current date
const currentDay = today.getDate(); 
const currentMonth = today.getMonth();

// Function to determine the latest day that can be opened
function getUnlockableDay() {
    // If the current month is December (11), allow opening up to the current day.
    if (currentMonth === 11) {
        return currentDay;
    }
    // If it's not December yet, or it's past Christmas, nothing can be opened.
    return 0;
    /* return TEST_DAY_OF_MONTH; */
}


doors.forEach(door => {
    door.addEventListener('click', () => {
        const day = parseInt(door.getAttribute('data-day'));
        const unlockableDay = getUnlockableDay();

        //Check if the day is available:
        if (day <= unlockableDay) {
            // Day is available (today or earlier)
            
            //Toggle logic:
            if (door.classList.contains('open')) {
                // If the door is open -> close it
                door.classList.remove('open');
                door.innerHTML = day; // Restore the day number
                messageElement.textContent = ``;
            } else {
                // If the door is closed -> open it
                door.classList.add('open');
                door.innerHTML = `<span class="door-day-number">${day}</span><br>${hints[day]}`;
                messageElement.textContent = `${hints[day]}`;
            }

        } else {
            // Day has not arrived yet
            messageElement.textContent = `Warte bis ${day}. Dezember! Das ist noch ein Geheimnis.`;
        }
    });
});
