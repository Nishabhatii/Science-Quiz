let userName="";
const quizData = [
  {
    question: "what is the unit of resistence?",
    options: ["ohm", "ohm-meter", "mho", "meter"],
    answer: 0
  },
  {
    question: "What is the order of colors in a rainbow(from top to buttom)",
    options: ["VIBGYOR", "ROYVIBG", "BIVGYOR", "RYBYORV"],
    answer: 0
  },
  {
    question: "the speed of sound is maximum in:",
    options: ["Vaccum", "water", "steel", "Air"],
    answer: 2
  },
  {
    question: "White light made up of:",
    options: ["3 primary colors", "only red and blue", "7 colors", "5 colors"],
    answer: 3
  },
  {
    question: "The device used to measure current is:",
    options: ["ohmmeter", "ammeter", "voltmeter", "galvnometer"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let answered = false;

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const timeoutSound = document.getElementById("timeoutSound");
const clickSound = document.getElementById("clickSound");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function startQuiz() {
 
  const input=document.getElementById("userName")
  if(input.value.trim()===""){
    alert("please enter your name")
    return;
  }
   userName=input.value.trim()

userName =input.value.trim()
document.getElementById("start-box").style.display="none"
document.getElementById("quiz-box").style.display="block"
loadQuestion()
}


function loadQuestion() {
  clearInterval(timer);
  timeLeft = 15;
  answered = false;
  document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

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
    li.innerHTML = `<label><input type="radio" name="option" value="${index}" 
    onclick="clickSound.play()" /> ${opt}</label>`;
    optionsList.appendChild(li);
  });
}

function submitAnswer() {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const selected = document.querySelector('input[name="option"]:checked');
  const correct = quizData[currentQuestion].answer;

  if (!selected) {
    timeoutSound.play();
  } else if (parseInt(selected.value) === correct) {
    correctSound.play();
    score++;
  } else {
    wrongSound.play();
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1200);
}



function showResult() {
  console.log("score is:", score)
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("result-box").style.display = "block";
  document.getElementById("score").textContent = score;
  document.getElementById("total").textContent = quizData.length;
   document.getElementById("displayName").textContent =userName;
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