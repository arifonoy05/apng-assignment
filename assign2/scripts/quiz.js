// student info
const student = {};

var newAttempt;
var resultList = [];
var currentId;

// correct answers
const answers = {
  q1: "Portable Network Graphics",
  q2: "Mozilla Firefox",
  q3: ["Stuart Parmenter", "Vladimir Vukicevic"],
  q4: "2004",
  q5: "APNG",
};

// aquired score
const score = {
  q1: "",
  q2: "",
  q3: [],
  q4: "",
  q5: "",
};

const form = document.getElementById("quizForm");
if (form) {
  form.addEventListener("submit", function (e) {
    grade = evaluate();
    e.preventDefault();
    if (!checkAnswerForCheckbox()) {
      return;
    }
    if (grade >= 2) {
      student.fname = document.getElementById("fname").value;
      student.lname = document.getElementById("lname").value;
      student.snum = document.getElementById("snum").value;
      student.grade = grade;
      student.score = score;

      newAttempt = student;

      if (localStorage.resultList == undefined) {
        // localStorage empty, store result as new value
        // should run once
        console.log("run once");
        newAttempt.attempt = 1;
        resultList.push(newAttempt);
        localStorage.setItem("resultList", JSON.stringify(resultList));
        localStorage.setItem("curr", JSON.stringify(newAttempt.snum));
        console.log(JSON.parse(localStorage.resultList));

        this.submit();
      } else {
        // localstorage contains data
        console.log("data exists");
        var sameID = false;

        // check if id exists in localstorage
        // overwrite if it does, otherwise append
        const data = JSON.parse(localStorage.resultList);
        console.log(data);
        resultList = data;
        resultList.map((item) => {
          if (item.snum == newAttempt.snum) {
            console.log("initiate overwrite!");
            console.log(item);
            // remove existing data
            newAttempt.attempt = item.attempt + 1;
            resultList.splice(resultList.indexOf(item), 1);
            sameID = true;
          }
        });

        if (!sameID) {
          newAttempt.attempt = 1;
        }

        if (newAttempt.attempt > 2) {
          alert(
            "You already took the quiz twice, you cannot take the quiz again!"
          );
        } else {
          // push data
          console.log("push new data and submit");
          resultList.push(newAttempt);
          localStorage.setItem("resultList", JSON.stringify(resultList));
          localStorage.setItem("curr", JSON.stringify(newAttempt.snum));
          console.log(localStorage.resultList);
          this.submit();
        }
      }

      // if attempt == 0 FOR THIS SPECIFIC USER_ID, attempt += 1, store new result, submit form
      // if attempt > 2 FOR THIS SPECIFIC USER_ID, attempt += 1, store result, submit form
      // else record as new user and attept == 1, store result, submit form
    } else alert("You must get atleast 2 correct answers!");
  });
}

function evaluate() {
  var grade = getGrade();

  if (grade < 3) {
    document.getElementById("grade").innerHTML = grade;
    document.getElementsByClassName("score")[0].style.display = "block";
  }
  return grade;
}

function getGrade() {
  var grade = 0;

  // check if answers are correct.
  // grade increments if an answer is correct
  if (q1_check()) {
    grade += 1;
  }
  if (q2_check()) {
    grade += 1;
  }
  if (q3_check()) {
    grade += 1;
  }
  if (q4_check()) {
    grade += 1;
  }
  if (q5_check()) {
    grade += 1;
  }

  return grade;
}

// check is Question 1 is correct
function q1_check() {
  const q1Ans = document.getElementById("q1").value;
  score.q1 = q1Ans;

  if (q1Ans == answers.q1) {
    console.log("q1 is correct", q1Ans);
    return true;
  } else {
    console.log("q1 is incorrect", q1Ans);
    return false;
  }
}

// check is Question 2 is correct
function q2_check() {
  const q2Ans = document.getElementsByName("q2");
  const q2Score = [];

  for (var i = 0; i < q2Ans.length; i++) {
    if (q2Ans[i].checked) {
      q2Score.push(q2Ans[i].value);
      score.q2 = q2Score[0];

      if (q2Ans[i].value == answers.q2) {
        console.log("q2 is correct", q2Score);
        return true;
      }
    }
  }

  console.log("q2 is incorrect", q2Score);
  return false;
}

// check is Question 3 is correct
function q3_check() {
  const res = new FormData(document.querySelector("form")).getAll("q3[]");

  if (
    res.length === answers.q3.length &&
    res.every((val, index) => val === answers.q3[index])
  ) {
    console.log("q3 is correct", res);
    score.q3 = res;
    return true;
  } else {
    console.log("q3 is incorrect", res);
    score.q3 = res;
    return false;
  }
}

// check is Question 4 is correct
function q4_check() {
  const chk = document.getElementById("q4").value;
  if (chk == answers.q4) {
    console.log("q4 is correct", chk);
    score.q4 = chk;
    return true;
  } else {
    console.log("q4 is incorrect", chk);
    score.q4 = chk;
    return false;
  }
}

// check is Question 5 is correct
function q5_check() {
  const chk = document.getElementById("q5").value;
  if (chk == answers.q5) {
    console.log("q5 is correct", chk);
    score.q5 = chk;
    return true;
  } else {
    console.log("q5 is incorrect", chk);
    score.q5 = chk;
    return false;
  }
}

// check whether any checkbox was selected
function checkAnswerForCheckbox() {
  const form_data = new FormData(document.querySelector("form"));

  if (form_data.getAll("q3[]").length === 0) {
    document.getElementById("ques3").style.background = "#ff000042";
    return false;
  } else {
    document.getElementById("ques3").style.background = "transparent";
    return true;
  }
}

if (localStorage.getItem("curr") != null) {
  const curr = JSON.parse(localStorage.curr);
  const resultList = JSON.parse(localStorage.resultList);
  var data;
  resultList.forEach((item) => {
    if (item.snum == curr) {
      data = item;
    }
  });
  console.log(data);

  document.getElementById("take").style.display = "none";
  document.getElementById("result").style.display = "block";

  document.getElementById("r_fname").innerHTML = data.fname;
  document.getElementById("r_lname").innerHTML = data.lname;
  document.getElementById("r_snum").innerHTML = data.snum;

  document.getElementById("q1").innerHTML = data.score.q1;
  document.getElementById("q2").innerHTML = data.score.q2;
  document.getElementById("q3").innerHTML = data.score.q3;
  document.getElementById("q4").innerHTML = data.score.q4;
  document.getElementById("q5").innerHTML = data.score.q5;

  document.getElementById("score").innerHTML = data.grade;
  document.getElementById("attempt").innerHTML = data.attempt;


  const trybtn = document.getElementById("trybtn");
  trybtn.innerText = "Try Again?";

  if(data.attempt == 2){
    trybtn.style.display = "none";  
  }

  trybtn.addEventListener("click", function () {
    window.location.href = "quiz.html";
  });
} else {
  if (document.getElementById("take")) {
    const trybtn = document.getElementById("trybtn");
    trybtn.innerText = "Take Quiz!";

    trybtn.addEventListener("click", function () {
      window.location.href = "quiz.html";
    });
  }
}
