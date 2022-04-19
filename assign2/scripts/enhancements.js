// timer
if (document.getElementById("quizForm")) {
  Timer();
}
function Timer() {
  var counter = 10;
  var myTimer = setInterval(function (e) {
    document.querySelector("#timer").style.display = "block";
    document.querySelector("#timer").innerHTML = counter;
    counter--;
    if (counter < 9) {
      document.querySelector("#timer").style.padding = "7px 13px";
      document.querySelector("#timer").classList.add("warn");
      document.querySelector("#timer").classList.add("blink");
    }
    if (counter < 0) {
      clearInterval(myTimer);
      document.querySelector("#timer").style.display = "none";
      alert("Time's up!");

      if (handleFormSubmit(e) == 0) {
        document.getElementById("submitbtn").style.display = "none";
        document.getElementById('score').scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function(){
          window.location.reload(1);
       }, 5000);
      }
    }
  }, 1000);
}

// highlight nav with active class based on url
function currentPage() {
  const nav = document.querySelectorAll("nav a");
  const urlFileName = location.href.split("/").pop();
  nav.forEach((item) => {
    const fileName = item.href.split("/").pop();
    if (fileName == urlFileName) {
      item.classList.add("active");
    }
  });
}
currentPage();
