//run on page start
var startPg = document.querySelector("#Cover");
var startBtn = document.querySelector("#startBtn")
var scbrdLink = document.querySelector("#sbLink");
var scorebrd = document.querySelector("#score-card");
var quest1 = document.querySelector("#Question1");
var quest2 = document.querySelector("#Question2");
var quest3 = document.querySelector("#Question3");
var quest4 = document.querySelector("#Question4");
var quest5 = document.querySelector("#Question5");
var inputScore = document.querySelector("#inputScoreInfo");
var questionArr = ["Question1", "Question2", "Question3", "Question4", "Question5"];
var answerBtn = document.querySelectorAll("button[correct]");
var correctFooter = document.querySelector("#correctFooter");
var incorrectFooter = document.querySelector("#incorrectFooter");
var scoreboardList = document.querySelector("#scoreboard");
var tryAgainBtn = document.querySelector("#tryAgain");
var sbClearBtn = document.querySelector("#clearBtn");

startPg.className = startPg.className.replace("hidden", "");

scbrdLink.addEventListener("click", function(){
  showCard(scorebrd);
});

// shows first question
startBtn.addEventListener("click", function(){
  questionArr = ["Question1", "Question2", "Question3", "Question4", "Question5"];
  showRandQuest(questionArr, inputScore);
  setTime(timerEl);
});

//loop through each answer button 
for(i=0; i<answerBtn.length; i++){
  var Btn = answerBtn.item(i);
  Btn.addEventListener("click", function(e){
    e=e||window.event;
    var btnEl = e.target||e.srcElement;
    var correctAnswer = answerCorrect(btnEl);
    if (correctAnswer == "true"){
      showRandQuest(questionArr, inputScore);
    }
    else{
      secondsLeft = secondsLeft - 10;
      timerEl.textContent = secondsLeft;
    }
  });
}

//Timer
var secondsLeft = 60;
var timerEl = document.getElementById("countdown");
var finalTime = document.getElementById("finalScore");

timerEl.textContent = secondsLeft;

var timerInterval;
function setTime(timerEl) {
    timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

    //if time runs out (timer = or < 0), show input card & score = 0
    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      showCard(inputScore);
      secondsLeft = 0;
      finalTime.textContent = secondsLeft;
    }

  }, 1000);
}

var initalsAdd = document.getElementById("initalsInput");
var initialsSubBtn = document.getElementById("initalsSubmit");

initialsSubBtn.addEventListener("click", function(){
  var initalsSubmit = initalsAdd.value;
  var userInitialsArr = [initalsSubmit, secondsLeft];
  initalsAdd.value = "";
  

  var highScores = JSON.parse(localStorage.getItem("highScores"));
  //if no score exist, push score into array
  if (highScores == null){
    localStorage.setItem("highScoresArr", JSON.stringify(userInitialsArr));
  }
    //push high score into array 
    else{
      for (i = 1; i < highScores.length; i+=2) {
        currentHS = highScores[i];
        
        var isHighscore = false;
        if(userInitialsArr[1] > highScores[i]){
          highScores.splice(i-1, 0, userInitialsArr[1]);
          highScores.splice(i-1, 0, userInitialsArr[0]);
          isHighscore = true;
          break;
        }
      }
      //if we didn't insert our scores anywhere and if there is space in the array it must be the low score.
      if (isHighscore == false && highScores2.length < 10){
        highScores.push(userInitialsArr[0]);
        highScores.push(userInitialsArr[1]);
      }
      localStorage.setItem("highScores", JSON.stringify(highScores2));
    }
  showCard(scorebrd);
});

// try again button
tryAgainBtn.addEventListener("click", function(){
  showCard(startPageEl);
  secondsLeft=60;
  timerEl.textContent = secondsLeft;
});

sbClearBtn.addEventListener("click", function(){
  while (scoreboardList.children.length > 0) {
    scoreboardList.children.item(0).remove();
  }
  localStorage.removeItem("highScores");
});


function showRandQuest(questionArr, inputScore){ 
  //checks length of question array
  if (questionArr.length == 0){
    showCard(inputScore);
    clearInterval(timerInterval);
    finalTime.textContent = secondsLeft;

  }
  else{ 
    var i = Math.floor(Math.random() * questionArr.length);
    var chsQuest = document.getElementById(questionArr[i]);
    questionArr.splice(i, 1);
    showCard(chsQuest);
  }
}

function showCard(calledCard){
  var allCards = document.querySelectorAll(".container");
  //loops through all cards
  for(i=0; i<allCards.length; i++){
    var currentCard = allCards.item(i);
    if(currentCard.className.includes("hidden") == false){
      currentCard.className += ' hidden';
    }   
  }
  //show card
  calledCard.className = calledCard.className.replace("hidden", "");
  console.log(calledCard.className);

  //check is card shown is the scoreboard card
  if (calledCard == scorebrd){
    // clear scoreboard
    while (scoreboardList.children.length > 0) {
      scoreboardList.children.item(0).remove();
    }
    var highScores = JSON.parse(localStorage.getItem("highScores"));

    // Render scoreboard scores 
    if (highScores != null){
      for (var i = 0; i < highScores.length; i+=2) {
        var currentHS = highScores[i] + ": " + highScores2[i+1];

        var li = document.createElement("li");
        li.textContent = currentHS;

        scoreboardList.appendChild(li);
      }
    }
  }
}

//correct-incorrect footer
function answerCorrect(btnEl){
  var isCorrect = btnEl.getAttribute("correct");
  if (isCorrect == "true"){
    correctFooter.className = correctFooter.className.replace("hidden", "");
    setTimeout(function(){
      correctFooter.className += ' hidden';
    }, 500);
  }
  else{
    // incorrect footer & correct footer
    incorrectFooter.className = incorrectFooter.className.replace("hidden", "");
    setTimeout(function(){
      incorrectFooter.className += ' hidden';
    }, 1000);
  }
  return isCorrect;
}