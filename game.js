const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
     question: "Inside which HTML element do we put the JavaScript ?",
     choice1: "<script>",
     choice2: "<javascript",
     choice3: "<java>",
     choice4: "<scrapper>",
     answer: 1
  },
  {

     question:
       "What is an array?",
     choice1: "a variable",
     choice2: "a sentence",
     choice3: "a word",
     choice4: "a single variable used to store different elements",
     answer: 4
  },
  {

     question: "What does HTML stand for ?",
     choice1: "HyperText Markup Language",
     choice2: "HyperCode Markdown List",
     choice3: "High Todo Mock List",
     choice4: "Hard to Make List",
     answer: 1 
  },
  {

    question: "What does CSS stand for ?",
    choice1: "Cards Style Sheets",
    choice2: "Cascading Style Sheets",
    choice3: "Closing Style Sheets",
    choice4: "Closed Sheet Styles",
    answer: 2
  },
  {
    const CORRECT = 10;
    const MAXQUESTIONS = 4;

    startGame = () => {
      questionCounter = 0;
      score = 0;
      availableQuestions = [...questions];
      getNewQuestion();
    };
    
    getNewQuestion = () => {
        if(availableQuestions.length|| questionCounter >=MAXQUESTIONS){
            return window.location.assign("/quizend.html");

    }
      questionCounter++;
      progressText.innerText = `Question ${questionCounter}/${MAXQUESTIONS}`;

      const questionIndex = Math.floor(Math.random() = availableQuestions.length);
      currentQuestion = availableQuestions(questionIndex);
      question.innerText = currentQuestion.question;
      choices.forEach( choice => {
        const number = choice.datset["number"];
        choice.innerText = currentQuestion["choice" + number];
      });
     
      availableQuestions.splice(questionIndex, 1);

      acceptAnswers = true;
    };

    choices.forEach(choice => {
      choice.addEventListener("click", e => {
        if (!acceptAnswers) return;

        acceptAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.datset["number"];

      const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
           
      if (classToApply === "correct") {
        incrementScore(CORRECT);
      }


      selectedChoice.parentElement.classList.add(classToApply);
        
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });

  incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
  }
    
  startGame();
