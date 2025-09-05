let userName = "";
const quizData = [
  {
    question: "What is the unit of resistance?",
    options: ["Ohm", "Ohm-meter", "Mho", "Meter"],
    answer: 0
  },
  {
    question: "What is the order of colors in a rainbow (from top to bottom)?",
    options: ["VIBGYOR", "ROYVIBG", "BIVGYOR", "RYBYORV"],
    answer: 0
  },
  {
    question: "The speed of sound is maximum in:",
    options: ["Vacuum", "Water", "Steel", "Air"],
    answer: 2
  },
  {
    question: "White light is made up of:",
    options: ["3 primary colors", "Only red and blue", "7 colors", "5 colors"],
    answer: 2
  },
  {
    question: "The device used to measure current is:",
    options: ["Ohmmeter", "Ammeter", "Voltmeter", "Galvanometer"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let answered = false;

// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  const input = document.getElementById("userName");
  if (input.value.trim() === "") {
    alert("Please enter your name");
    return;
  }
  userName = input.value.trim();

  document.getElementById("start-box").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  answered = false;
  document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

  // ✅ Progress bar update
  const progress = (currentQuestion / quizData.length) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      submitAnswer();
    }
  }, 1000);

  const q = quizData[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const optionsList = document.getElementById("options");
  optionsList.innerHTML = "";

  q.options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<label>
      <input type="radio" name="option" value="${index}" />
      ${opt}
    </label>`;
    optionsList.appendChild(li);
  });
}

function submitAnswer() {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const selected = document.querySelector('input[name="option"]:checked');
  const correct = quizData[currentQuestion].answer;

  if (selected && parseInt(selected.value) === correct) {
    score++;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 800);
}

function showResult() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";
  document.getElementById("score").textContent = score;
  document.getElementById("total").textContent = quizData.length;
  document.getElementById("displayName").textContent = userName;

  // ✅ Progress bar full
  document.getElementById("progress-bar").style.width = "100%";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  shuffle(quizData);
  document.getElementById("quiz-box").style.display = "block";
  document.getElementById("result-box").style.display = "none";
  document.getElementById("userName").value = "";
  loadQuestion();
}

window.onload = () => {
  shuffle(quizData);
};
