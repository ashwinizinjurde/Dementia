const registration = document.querySelector(".registration");
const assessment = document.querySelector(".assessment");
const results = document.querySelector(".results");
const questionContainer = document.querySelector("#questionContainer");
const timerDisplay = document.querySelector("#timeLeft");
const nextButton = document.querySelector("#nextQuestion");
const totalScoreDisplay = document.querySelector("#totalScore");
const severityDisplay = document.querySelector("#severity");

let currentQuestionIndex = 0;
let score = 0;
let timer;

// Questions array
const questions = [
  { text: 'What year is this?', options: ["2022", "2023", "2024", "2025"], points: 1, time: 10 },
  { text: 'What season is this?', options: ["Winter", "Spring", "Summer", "Fall"], points: 1, time: 10 },
  { text: 'What month is this?', options: ["January", "February", "March", "April"], points: 1, time: 10 },
  { text: 'What is today’s date?', options: ["11", "12", "13", "14"], points: 1, time: 10 },
  { text: 'What day of the week is this?', options: ["Sunday", "Monday", "Tuesday", "None of the above"], points: 1, time: 10 },
  { text: "What country are we in?", task: "caregiver-eval", points: 1, time: 10 },
  { text: "What province are we in?", task: "caregiver-eval", points: 1, time: 10 },
  { text: "What city/town are we in?", task: "caregiver-eval", points: 1, time: 10 },
  { text: "(In home) What is the street address of this house?", task: "caregiver-eval", points: 1, time: 10 },
  { text: "(In facility) What is the name of this building?", task: "caregiver-eval", points: 1, time: 10 },
  { text: "(In home) What room are we in?", task: "caregiver-eval", points: 1, time: 10 },
  { text: "(In facility) What floor of the building are we on?", task: "caregiver-eval", points: 1, time: 10 },
  { text: 'I am going to name three objects: Ball, Car, Man. Repeat them.', points: 3, time: 20, task: "selection", options: ["Ball", "Car", "Man"] },
  { text: 'Spell the word WORLD. Now spell it backwards.', points: 5, task: "text-input", time: 30 },
  { text: 'What were the three objects I asked you to remember?', points: 3, task: "text-input", time: 10 },
  { text: 'What is this object called?', image: "images/wristwatch.jpeg", points: 1, time: 10 },
  { text: 'What is this object called?', image: "images/pencil.jpeg", points: 1, time: 10 },
  { text: 'Close your eyes after reading this instruction.', points: 1, time: 10, task: "caregiver-eval" },
  { text: 'Write any complete sentence on that piece of paper.', points: 1, task: "text-input", time: 30 },

  { text: 'Follow these instructions: Take this paper, fold it in half, and put it on the floor.', points: 3, time: 30, task: "instruction" },
];

// Mapping questions to their blur notes
const notes = {
  "What year is this?": "(accept exact answer only)",
  "What season is this?": "(accept either: last week of the old season or first week of a new season)",
  "What month is this?": "(accept either: the first day of a new month or the last day of the previous month)",
  "What is today’s date?": "(accept previous or next date)",
  "What day of the week is this?": "(accept exact answer only)",
  "What country are we in?": "(accept exact answer only)",
  "What province are we in?": "(accept exact answer only)",
  "What city/town are we in?": "(accept exact answer only)",
  "(In home) What is the street address of this house?": "(accept street name and house number or equivalent in rural areas)",
  "(In facility) What is the name of this building?": "(accept exact name of institution only)",
  "(In home) What room are we in?": "(accept exact answer only)",
  "(In facility) What floor of the building are we on?": "(accept exact answer only)",
  "Close your eyes after reading this instruction.": "(Hand the person a sheet with CLOSE YOUR EYES on it and evaluate their response)",
};

// Start Test
document.querySelector("#startRegistration").onclick = () => {
  const adminName = document.querySelector("#adminName").value.trim();
  const relationship = document.querySelector("#relationship").value;

  if (!adminName) {
    alert("Please enter your name to proceed!");
    return;
  }

  if (!relationship) {
    alert("Please select your relationship with the patient.");
    return;
  }

  console.log(`Caregiver Name: ${adminName}, Relationship: ${relationship}`);
  registration.style.display = "none";
  assessment.style.display = "block";
  loadQuestion(currentQuestionIndex);
};

// Load Question
function loadQuestion(index) {
  clearInterval(timer); // Stop any existing timer
  const question = questions[index];

  if (!question) {
    console.error("No question found at index", index);
    return;
  }

  const blurNote = notes[question.text] ? `<span class="blur-note">${notes[question.text]}</span>` : "";

  // Handle wristwatch and pencil questions
  if (question.text.includes("What is this object called?")) {
    questionContainer.innerHTML = `
      <h3>${question.text}</h3>
      ${
        question.image
          ? `<img src="${question.image}" alt="Question Image" style="max-width:100%; height:auto; margin:20px 0;">`
          : ""
      }
      <h3>Is the patient answering correctly?</h3>
      <div class="evaluation-buttons">
        <button class="yes-no-btn" onclick="recordCaregiverResponse(true)">Yes</button>
        <button class="yes-no-btn" onclick="recordCaregiverResponse(false)">No</button>
      </div>
    `;
    startTimer(question.time); // Keep the timer running
    nextButton.style.display = "block"; // Ensure Next button is displayed
    return; // Exit after rendering this specific layout
  }

  // Render other questions
  questionContainer.innerHTML = `
    <h3>${question.text} ${blurNote}</h3>
    ${
      question.image
        ? `<img src="${question.image}" alt="Question Image" style="max-width:100%; height:auto; margin:20px 0;">`
        : ""
    }
    ${
      question.options
        ? question.options
            .map(
              (option, idx) =>
                `<button class="option-btn" onclick="selectOption('${option}', ${idx})">${option}</button>`
            )
            .join("")
        : question.task === "text-input"
        ? '<input type="text" id="textInput" placeholder="Enter answer here" oninput="showNextButton()">'
        : question.task === "caregiver-eval"
        ? `<div class="evaluation-buttons">
             <button class="yes-no-btn" onclick="recordCaregiverResponse(true)">Correct</button>
             <button class="yes-no-btn" onclick="recordCaregiverResponse(false)">Incorrect</button>
           </div>`
        : question.task === "instruction"
        ? `<p>Follow the instructions and evaluate accordingly.</p>
           <div class="evaluation-buttons">
             <button class="yes-no-btn" onclick="recordCaregiverResponse(true)">Correct</button>
             <button class="yes-no-btn" onclick="recordCaregiverResponse(false)">Incorrect</button>
           </div>`
        : ""
    }
  `;

  startTimer(question.time); // Start the timer for all other questions

  if (question.task === "text-input") {
    nextButton.style.display = "block"; // Always show Next for text-input
  } else {
    nextButton.style.display = question.options || question.task ? "none" : "block"; // Other conditions
  }
}


// Show Next Button for text input
function showNextButton() {
  nextButton.style.display = "block";
}

// Handle Option Selection
function selectOption(selected, selectedIndex) {
  const options = document.querySelectorAll(".option-btn");
  options.forEach((btn, idx) => {
    if (idx !== selectedIndex) {
      btn.style.opacity = "0.5"; // Blur unselected options
    } else {
      btn.style.opacity = "1";
      btn.style.fontWeight = "bold";
    }
  });
  score++;
  nextButton.style.display = "block"; // Show the Next button
}

// Record Response
function recordCaregiverResponse(isCorrect) {
  if (isCorrect) score++;
  nextButton.style.display = "block";
}

// Timer
function startTimer(duration) {
  let timeLeft = duration;
  timerDisplay.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextButton.style.display = "block";
    }
  }, 1000);
}

// Next Button Handler
nextButton.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
  } else {
    endTest();
  }
};

function selectOption(selected, selectedIndex) {
  const options = document.querySelectorAll(".option-btn");
  options.forEach((btn, idx) => {
    if (idx !== selectedIndex) {
      btn.style.opacity = "0.5"; // Blur unselected options
    } else {
      btn.style.opacity = "1"; // Highlight the selected option
      btn.style.fontWeight = "bold";
    }
  });
  score++; // Increment score for the correct selection
  nextButton.style.display = "block"; // Show the Next button
}


// End Test
function endTest() {
  clearInterval(timer);
  assessment.style.display = "none";
  results.style.display = "block";
  totalScoreDisplay.textContent = `Total Score: ${score} / ${questions.reduce((a, q) => a + q.points, 0)}`;
  severityDisplay.textContent =
    score >= 15
      ? "No signs of cognitive impairment."
      : score >= 10
      ? "Mild cognitive impairment."
      : "Severe cognitive impairment.";
}
