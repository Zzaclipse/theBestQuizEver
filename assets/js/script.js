var timeLeft = $("#timeLeft");
var startButton = $("#strtBtn");
var buttonBox = $(".buttonContainer");
var questionText = $("#questionText");
var rightWrongText = $("#rightWrong");
var startBox = $(".startBox");
var initalsBox = $("#initials");
var highscoresList = $("#highscores");

var gameStarted = false;
var secondsLeft = 60;
var points = 0;

var newButton1 = $("<button>");
var newButton2 = $("<button>");
var newButton3 = $("<button>");
var newButton4 = $("<button>");
newButton1.attr("btn-num", 1);
newButton2.attr("btn-num", 2);
newButton3.attr("btn-num", 3);
newButton4.attr("btn-num", 4);

var questionsArray = [
  {
    q: "Commonly used data types do not include:",
    op1: "Strings",
    op2: "Booleans",
    op3: "Alerts",
    op4: "Numbers",
    correct: 3,
  },

  {
    q: "Inside which HTML element do we put the JavaScript?",
    op1: "<js>",
    op2: "<scripting>",
    op3: "<javascript>",
    op4: "<script>",
    correct: 4,
  },

  {
    q: "How do you write 'Hello World' in an alert box?",
    op1: "alert('Hello World');",
    op2: "msg('Hello World');",
    op3: "alertBox('Hello World');",
    op4: "msgBox('Hello World');",
    correct: 1,
  },

  {
    q: "How do you create a function in JavaScript?",
    op1: "function = myFunction()",
    op2: "function myFunction()",
    op3: "function:myFunction()",
    op4: "<function>myFunction()</function>",
    correct: 2,
  },

  {
    q: "How do you call a function named 'myFunction'?",
    op1: "myFunction()",
    op2: "call myFunction()",
    op3: "call function myFunction()",
    op4: "functionMy()",
    correct: 1,
  },

  {
    q: "How to write an IF statement in JavaScript?",
    op1: "if (i==5)",
    op2: "if i==5 then",
    op3: "if i=5",
    op4: "if i=5 then",
    correct: 1,
  },

  {
    q: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    op1: "if (i<>5)",
    op2: "if i<>5",
    op3: "if (i!=5)",
    op4: "if i=! 5 then",
    correct: 3,
  },

  {
    q: "How does a WHILE loop start?",
    op1: "while(i<=10)",
    op2: "while(i<=10; i++)",
    op3: "while i=1 to 10",
    op4: "while(var i=0; i<5; i++)",
    correct: 1,
  },

  {
    q: "How does a FOR loop start?",
    op1: "for(i=0;i<=5;i++)",
    op2: "for(i=0;i<=5)",
    op3: "for(i<=5;i++)",
    op4: "for i=1 to 5",
    correct: 1,
  },

  {
    q: "How can you add a comment in a JavaScript?",
    op1: "<-- comment -->",
    op2: "//comment",
    op3: "'comment'",
    op4: "#comment#",
    correct: 2,
  },

  {
    q: "What is the correct way to write a JavaScript array?",
    op1: "var colors = 'red', 'green', 'blue'",
    op2: "var colors = ['red', 'green', 'blue']",
    op3: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')",
    op4: "var colors = (1:'red',2:'green',3:'blue')",
    correct: 2,
  },

  {
    q: "How do you round the number 7.25, to the nearest integer?",
    op1: "round(7.25)",
    op2: "rnd(7.25)",
    op3: "Math.round(7.25)",
    op4: "Math.rnd(7.25)",
    correct: 3,
  },

  {
    q: "How do you declare a JavaScript variable?",
    op1: "v name",
    op2: "var name",
    op3: "variable name",
    op4: "function name()",
    correct: 2,
  },

  {
    q: "Which operator is used to assign a value to a variable?",
    op1: "*",
    op2: "-",
    op3: "X",
    op4: "=",
    correct: 4,
  },

  {
    q: "Choose the correct HTML element for the largest heading:",
    op1: "<heading>",
    op2: "<head>",
    op3: "<h6>",
    op4: "<h1>",
    correct: 4,
  },

  {
    q: "How can you add a comment in a HTML?",
    op1: "<-- comment -->",
    op2: "//comment",
    op3: "'comment'",
    op4: "#comment#",
    correct: 1,
  },

  {
    q: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    op1: "alt",
    op2: "src",
    op3: "title",
    op4: "longdesc",
    correct: 1,
  },

  {
    q: "Which HTML element is used to specify a footer for a document or section?",
    op1: "<section>",
    op2: "<footer>",
    op3: "<bottom>",
    op4: "<under>",
    correct: 2,
  },

  {
    q: "Which HTML element defines navigation links?",
    op1: "<navigate>",
    op2: "<nav>",
    op3: "<a>",
    op4: "<gps>",
    correct: 2,
  },

  {
    q: "Which HTML element is used to specify a header for a document or section?",
    op1: "<top>",
    op2: "<head>",
    op3: "<section>",
    op4: "<header>",
    correct: 4,
  },
];

function startTimer() {
  if (gameStarted) {
    return;
  }
  gameStarted = true;
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeLeft.text("Time left: " + secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      gameStarted = false;
      endGame();
    } else if (!gameStarted) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function testIfCorrect(clicked, i) {
  console.log("correct answer " + questionsArray[i].correct);

  if (clicked == questionsArray[i].correct) {
    points++;
    rightWrongText.text("Correct!");
    rightWrongText.css("color", "green");
  } else {
    rightWrongText.text("Wrong");
    rightWrongText.css("color", "red");
    secondsLeft -= 5;
  }
  localStorage.setItem("points", points);
}

function renderQuestion(i) {
  questionText.text(questionsArray[i].q);
  newButton1.text(questionsArray[i].op1);
  newButton2.text(questionsArray[i].op2);
  newButton3.text(questionsArray[i].op3);
  newButton4.text(questionsArray[i].op4);

  buttonBox.append(newButton1);
  buttonBox.append(newButton2);
  buttonBox.append(newButton3);
  buttonBox.append(newButton4);
}

function pageSwap() {
  console.log("got here");
  document.location.href = "./highscores.html";
  console.log("got here 12");
}

function addHighscore() {
  var score = localStorage.getItem("points");
  var highscores = localStorage.getItem("highscores");

  if (highscores) {
    highscores = highscores.split(",");
    highscores.push(score);
    localStorage.setItem("highscores", highscores);
  } else {
    localStorage.setItem("highscores", score);
  }

  var initials = localStorage.getItem("initials");
  var initArray = localStorage.getItem("hsInitials");

  if (initArray) {
    initArray = initArray.split(",");
    initArray.push(initials);
    localStorage.setItem("hsInitials", initArray);
  } else {
    localStorage.setItem("hsInitials", initials);
  }

  var newHighscore = $("<li>").text(initials + ": " + score);
  highscoresList.append(newHighscore);
}

function endGame() {
  gameStarted = false;
  questionText.text("Enter your initials.");
  buttonBox.children().remove();
  rightWrongText.text("");
  var input = $("<input>").attr({
    type: "text",
    id: "initials",
    name: "initals",
  });
  initalsBox.append(input);
  var submitButton = $("<button>").text("Submit");
  startBox.append(submitButton);

  submitButton.on("click", function () {
    var initials = input.val();
    localStorage.setItem("initials", initials);

    addHighscore();

    pageSwap();
  });
}

function startQuiz() {
  startTimer();
  startBox.children().remove();
  var i = 0;
  renderQuestion(i);

  buttonBox.on("click", function (event) {
    var clickedButton = event.target.getAttribute("btn-num");
    console.log("clicked: " + clickedButton + " i: " + i);
    if (i == questionsArray.length) {
      endGame();
    }
    testIfCorrect(clickedButton, i);
    i++;
    renderQuestion(i);
  });
}

startButton.on("click", startQuiz);
