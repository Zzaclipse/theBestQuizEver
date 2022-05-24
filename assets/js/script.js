// using jQuery to grab elements from the html page to append and remove things
var timeLeft = $("#timeLeft");
var startButton = $("#strtBtn");
var buttonBox = $(".buttonContainer");
var questionText = $("#questionText");
var rightWrongText = $("#rightWrong");
var startBox = $(".startBox");
var initalsBox = $("#initials");
var highscoresList = $("#highscores");

// gameStarted is for the timer function to operate correctly when the game ends
// secondsLeft is the amount of time for the quiz
// points is the current number of correct questions this quiz attempt
var gameStarted = false;
var secondsLeft = 60;
var points = 0;

// new buttons that will be appended later and act as the 4 options for the quiz
var newButton1 = $("<button>");
var newButton2 = $("<button>");
var newButton3 = $("<button>");
var newButton4 = $("<button>");
newButton1.attr("btn-num", 1);
newButton2.attr("btn-num", 2);
newButton3.attr("btn-num", 3);
newButton4.attr("btn-num", 4);

// array of objects of all quiz questions, q value is the question, op1, op2, op3, and op4 are all possible answers and correct is the correct option
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
    op3: "function: myFunction()",
    op4: "<function> myFunction() </function>",
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
    op1: "for(i=0; i<=5; i++)",
    op2: "for(i=0; i<=5)",
    op3: "for(i<=5; i++)",
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
    op4: "var colors = (1:'red', 2:'green', 3:'blue')",
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

// this is called at the begining of the game and starts the timer
// the timer will end if all 20 questions are answered
// if timer reaches 0 before all questions are answered then endGame function is called
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

// this gets called when clicking any of the 4 buttons under the question
// then compares the clicked buttons number with the correct answer in the questionsArray
// if it is correct then points in incremented by 1 and added to local storage, and green text saying correct! is put on the screen then fades out
// if it is wrong then seconds left is decremented by 5 and red wrong text is put on the screen then fades out
function testIfCorrect(clicked, i) {
  // console.log("correct answer " + questionsArray[i].correct);

  if (clicked == questionsArray[i].correct) {
    points++;
    rightWrongText.fadeIn("fast");
    rightWrongText.text("Correct!");
    rightWrongText.css("color", "white");
    rightWrongText.css("border", "5px");
    rightWrongText.css("border-color", "green");
    rightWrongText.css("border-radius", "var(--borrad)");
    rightWrongText.css("border-style", "solid");
    rightWrongText.css("background-color", "green");
    rightWrongText.delay(750).fadeOut("slow");
  } else {
    rightWrongText.fadeIn("fast");
    rightWrongText.text("Wrong");
    rightWrongText.css("color", "white");
    rightWrongText.css("border", "5px");
    rightWrongText.css("border-color", "red");
    rightWrongText.css("border-radius", "var(--borrad)");
    rightWrongText.css("border-style", "solid");
    rightWrongText.css("background-color", "red");
    rightWrongText.delay(750).fadeOut("slow");
    secondsLeft -= 5;
  }
  localStorage.setItem("points", points);
}

// uses input i to put the next questions text on the screen and 4 options in to the buttons
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

// switiches pages to the highscores html page
function pageSwap() {
  document.location.href = "./highscores.html";
}

// this function is called at the end of the game and gets scores and initials from local storage to
// create an 2 arrays of all exsisting scores and initials and puts that back in local storage for the highscores script to use
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
}

// this function will end the game by deleting all the question buttons and changing the text to 'enter your initials'
// it then puts an input field for you to enter your initials and a submit button
// when the button is clicked it will add the initials to localstorage, call addHighscore function and then page swap to the highscore html page
function endGame() {
  gameStarted = false;
  questionText.text("Enter your initials.");
  buttonBox.children().remove();
  rightWrongText.remove();
  var input = $("<input>").attr({
    type: "text",
    id: "initials",
    name: "initals",
  });
  initalsBox.append(input);
  var submitButton = $("<button>").text("Submit");
  submitButton.addClass("submitBtn");
  startBox.append(submitButton);

  submitButton.on("click", function () {
    var initials = input.val();
    localStorage.setItem("initials", initials);

    addHighscore();

    pageSwap();
  });
}

// first function that is called, will call the startTimer and renderQuestion functions after deleting the start button from the page
// renderQuestion function will create the new buttons and append them in to buttonBox, so i use event bubbling to have one eventlister on the container with all the buttons
// after every button click, variable i is incremented by one and then renderQuestion is called again to put the next question on the page
// this will continue until i reaches the length of the questions array and calls the endGame function
function startQuiz() {
  startTimer();
  startBox.children().remove();
  var i = 0;
  renderQuestion(i);

  buttonBox.on("click", function (event) {
    var clickedButton = event.target.getAttribute("btn-num");
    // console.log("clicked: " + clickedButton + " i: " + i);

    testIfCorrect(clickedButton, i);
    i++;
    if (i == questionsArray.length) {
      endGame();
    } else {
      renderQuestion(i);
    }
  });
}

// starts the quiz on button click
startButton.on("click", startQuiz);
