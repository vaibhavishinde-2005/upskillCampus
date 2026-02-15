// Get category from URL
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

// Save to localStorage for result page
localStorage.setItem("quizCategory", selectedCategory);

// Load questions
const questions = window.quizData[selectedCategory];

if (!questions) {
  alert("Invalid category!");
  window.location.href = "dashboard.html";
}

let currentIndex = 0;
let score = 0;
let selected = null;

const quizTitle = document.getElementById("quizTitle");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const counterEl = document.getElementById("counter");
const progressEl = document.getElementById("progress");

// ✅ FIXED HERE
quizTitle.innerText = selectedCategory.replace("_", " ").toUpperCase();

function loadQuestion() {
  const q = questions[currentIndex];

  questionEl.innerText = q.question;
  counterEl.innerText = `${currentIndex + 1}/${questions.length}`;
  progressEl.style.width =
    ((currentIndex + 1) / questions.length) * 100 + "%";

  optionsEl.innerHTML = "";
  selected = null;

  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => selectOption(i);
    optionsEl.appendChild(div);
  });
}

function selectOption(index) {
  selected = index;

  document.querySelectorAll(".option").forEach((el, i) => {
    el.classList.toggle("selected", i === index);
  });
}

function nextQuestion() {
  if (selected === null) {
    alert("Select an option");
    return;
  }

  if (selected === questions[currentIndex].correct) {
    score++;
  }

  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  localStorage.setItem("quizScore", score);
  localStorage.setItem("quizTotal", questions.length);

  // ✅ FIXED HERE
  localStorage.setItem("quizCategory", selectedCategory);

  window.location.href = "result.html";
}

function quitQuiz() {
  window.location.href = "dashboard.html";
}

loadQuestion();
