// timer
function Timer() {
  var counter = 3;
  var myTimer = setInterval(function (e) {
    document.querySelector("#timer").style.display = "block";
    document.querySelector("#timer").innerHTML = counter;
    counter--;
    if (counter < 9) {
      document.querySelector("#timer").style.padding = "7px 13px";
      document.querySelector("#timer").classList.add("warn");
      document.querySelector("#timer").classList.add("blink");

      //   var blink_speed = 100; // every 1000 == 1 second, adjust to suit
      //   var t = setInterval(function () {
      //     var ele = document.getElementById("timer");
      //     ele.style.visibility = ele.style.visibility == "hidden" ? "" : "hidden";
      //   }, blink_speed);
    }
    if (counter < 0) {
      clearInterval(myTimer);
      document.querySelector("#timer").style.display = "none";
      alert("times up");

      setTimeout(handleFormSubmit, 3000);
      // form.submit();
    }
  }, 1000);
}
Timer();
