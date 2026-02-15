import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyC02WxGlk41JhJ3rV3lagxMIKnhakESg2E",
  authDomain: "quizproject-24f19.firebaseapp.com",
  databaseURL: "https://quizproject-24f19-default-rtdb.firebaseio.com/",
  projectId: "quizproject-24f19",
  storageBucket: "quizproject-24f19.appspot.com",
  messagingSenderId: "737449040432",
  appId: "1:737449040432:web:f80840da1b6b64bf332bf5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const score = parseInt(localStorage.getItem("quizScore")) || 0;
const total = parseInt(localStorage.getItem("quizTotal")) || 0;
const category = localStorage.getItem("quizCategory") || "Unknown";

const percentage = total > 0
  ? Math.round((score / total) * 100)
  : 0;

// Show score on UI
document.getElementById("score-text").innerHTML =
  `${score}<span>/${total}</span>`;

document.getElementById("score-percent").innerText =
  `${percentage}%`;

// Save per individual user
onAuthStateChanged(auth, (user) => {

  if (!user) {
    console.log("User not logged in");
    return;
  }

  const userRef = ref(db, "quizResults/" + user.uid);

  push(userRef, {
    score: score,
    total: total,
    category: category,
    percentage: percentage,
    timestamp: Date.now()
  })
  .then(() => console.log("Saved successfully"))
  .catch(err => console.log("Error:", err));

});
// Restart Quiz
window.restartQuiz = function() {
  const category = localStorage.getItem("quizCategory");

  if (category) {
    window.location.href = `quiz.html?category=${category}`;
  } else {
    window.location.href = "dashboard.html";
  }
};

// Go To Dashboard
window.goToDashboard = function() {
  window.location.href = "dashboard.html";
};
