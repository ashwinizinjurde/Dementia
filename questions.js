const questions = [
  { text: 'What year is this?', options: ["2022", "2023", "2024", "2025"], points: 1, time: 10 },
  { text: 'What season is this?', options: ["Winter", "Spring", "Summer", "Fall"], points: 1, time: 10 },
  { text: 'What month is this?', options: ["January", "February", "March", "April"], points: 1, time: 10 },
  { text: 'What is today’s date?', options: ["11", "12", "13", "14"], points: 1, time: 10 },
  { text: 'What day of the week is this?', options: ["Sunday","Monday", "Tuesday","None of the above" ], points: 1, time: 10 },
  {
  text: "What country are we in?",
  task: "caregiver-eval",
  points: 1,
  time: 10
},
{
  text: "What province are we in?",
  task: "caregiver-eval",
  points: 1,
  time: 10
},
{
  text: "What city/town are we in?",
  task: "caregiver-eval",
  points: 1,
  time: 10
},
{
  text: "(In home) What is the street address of this house?",
  task: "caregiver-eval",
  points: 1,
  time: 10
},
{
  text: "(In facility) What is the name of this building?",
  task: "caregiver-eval",
  points: 1,
  time: 10
},
{
  text: "(In home) What room are we in?",
  task: "caregiver-eval",
  points: 1,
  time: 10
},
{
  text: "(In facility) What floor of the building are we on?",
  task: "caregiver-eval",
  points: 1,
  time: 10
},

  {
  text: 'I am going to name three objects: Ball, Car, Man. Repeat them.',
  points: 3,
  time: 20,
  options: ["Ball", "Car", "Man"],
  task: "selection",
}
,
  { text: 'Spell the word WORLD. Now spell it backwards.', points: 5, task: "text-input", time: 30 },
  {
    text: 'What were the three objects I asked you to remember?',
    points: 3,
    time: 10,
    task: "text-input",
  },
  { text: 'What is this object called?', image: "images/wristwatch.jpeg" , points: 1, time: 10 },
  { text: 'What is this object called?', image: "images/pencil.jpeg", points: 1, time: 10 },

  {
    text: 'Close your eyes after reading this instruction.',
    points: 1,
    time: 10,
    task: "caregiver-eval",

  },
  {
    text: 'Write any complete sentence on that piece of paper.',
    points: 1,
    time: 30,
    task: "text-input",
  },

  {
    text: 'Follow these instructions: Take this paper, fold it in half, and put it on the floor.',
    points: 3,
    time: 30,
    task: "caregiver-eval",
  },
];



