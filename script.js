/*
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
  10: "Im Badezimmerschrank.",
  11: "In der Küchenschublade.",
  12: "Neben dem Computer.",
  13: "Hinter dem Fernseher.",
  14: "Im Schrank oben links.",
  15: "Unter dem Tisch.",
  16: "Im Rucksack.",
  17: "Im Kleiderschrank.",
  18: "Bei den Weihnachtskeksen 🍪",
  19: "In der Jackentasche.",
  20: "Bei den Sportsachen.",
  21: "Im Bücherregal.",
  22: "Hinter dem Spiegel.",
  23: "Unter der Decke 😴",
  24: "Unter dem Weihnachtsbaum 🎄"
};

const messageBox = document.getElementById("message");
const doors = document.querySelectorAll(".door");

// 
const today = new Date();
const currentDay = today.getMonth() === 11 ? today.getDate() : 0;

doors.forEach(door => {
  door.addEventListener("click", () => {
    const day = parseInt(door.dataset.day);

    if (day > currentDay) {
      messageBox.textContent = "Noch zu früh! 🎅";
      return;
    }

    if (!door.classList.contains("open")) {
      door.classList.add("open");
      door.textContent = hints[day] || "Frohe Weihnachten!";
      messageBox.textContent = "";
    }
  });
}); */

// day hints
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
  10: "Im Badezimmerschrank.",
  11: "In der Küchenschublade.",
  12: "Neben dem Computer.",
  13: "Hinter dem Fernseher.",
  14: "Im Schrank oben links.",
  15: "Unter dem Tisch.",
  16: "Im Rucksack.",
  17: "Im Kleiderschrank.",
  18: "Bei den Weihnachtskeksen 🍪",
  19: "In der Jackentasche.",
  20: "Bei den Sportsachen.",
  21: "Im Bücherregal.",
  22: "Hinter dem Spiegel.",
  23: "Unter der Decke 😴",
  24: "Unter dem Weihnachtsbaum 🎄"
};

const messageBox = document.getElementById("message");
const doors = document.querySelectorAll(".door");

doors.forEach(door => {
  door.addEventListener("click", () => {
    const day = parseInt(door.dataset.day);

    // If the door was opend - close again
    if (door.classList.contains("open")) {
      door.classList.remove("open");
      door.textContent = day; // return day number
      messageBox.textContent = `Türchen ${day} geschlossen. 🔒`;
    } else {
      // open the door                                                                                                                                     
      door.classList.add("open");
      door.textContent = hints[day] || "Frohe Weihnachten!";
      messageBox.textContent = `Türchen ${day} geöffnet 🎁`;
    }
  });
});