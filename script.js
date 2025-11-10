// Hints/content for each day of the advent calendar
const hints = {
    1: "Schau unter dem Kissen!",
    2: "Im Kühlschrank, neben der Milch.",
    3: "Vielleicht in deiner Tasche?",
    4: "Hinter dem Vorhang?",
    5: "Im Schuhschrank!",
    6: "Neben deinem Lieblingsbuch.",
    7: "Unter dem Sofa.",
    8: "Auf dem Balkon!",
    9: "Bei den Pflanzen 🌿",
    10: "Im Badezimmerschrank!",
    11: "In der Küchenschublade.",
    12: "Neben dem Computer.",
    13: "Hinter dem Fernseher.",
    14: "Im Schrank oben links.",
    15: "Unter dem Tisch.",
    16: "Im Rucksack.",
    17: "Im Kleiderschrank.",
    10: "Bei den Weihnachtskeksen 🍪",
    19: "In der Jackentasche.",
    20: "Bei den Sportsachen.",
    21: "Im Bücherregal.",
    22: "Hinter dem Spiegel.",
    23: "Unter der Decke 😴",
    24: "Unter dem Weihnachtsbaum 🎄"
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
                messageElement.textContent = `Das Türchen ${day} wurde geschlossen.`;
            } else {
                // If the door is closed -> open it
                door.classList.add('open');
                door.innerHTML = `<span class="door-day-number">${day}</span><br>${hints[day]}`;
                messageElement.textContent = `Tipp für Tag ${day}: ${hints[day]}`;
            }

        } else {
            // Day has not arrived yet
            messageElement.textContent = `Warte bis ${day}. Dezember! Das ist noch ein Geheimnis.`;
        }
    });
});
