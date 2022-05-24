// this script will run when highscores page is opened or switched to.
// i pull the arrays of all highscores and initials from local storage and sort them in hsSort()
// hsSort uses sort function where if a>b it returns -1 thus sorting a before b and vice versa. if the values are equal then it returns 0
// hsSort then creates an array of objects sorted by score and returns that array
// renderHighscores will then for loop through the array to append the objects to the page

var highscoresBox = $("#highscores");
var clearButton = $("#clearBtn");
var backButton = $("#goBack");

function hsSort() {
  var highscores = localStorage.getItem("highscores");
  var initials = localStorage.getItem("hsInitials");

  if (!highscores || !initials) {
    return [];
  }

  highscoresArray = highscores.split(",");
  initialsArray = initials.split(",");

  var sortArray = [];

  for (var i = 0; i < highscoresArray.length; i++) {
    sortArray.push({ initials: initialsArray[i], score: highscoresArray[i] });
  }
  sortArray.sort(function (a, b) {
    var numA = parseInt(a.score);
    var numB = parseInt(b.score);
    if (numA > numB) {
      return -1;
    } else if (numA < numB) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortArray;
}

function renderHighscores() {
  var sortArray = hsSort();

  for (var e of sortArray) {
    var listItem = $("<li>");
    listItem.text(e.initials + ": " + e.score);
    highscoresBox.append(listItem);
  }
}

function clearStorage() {
  localStorage.clear();
  document.location.href = "./highscores.html";
}

function pageSwap() {
  document.location.href = "./index.html";
}

renderHighscores();
clearButton.on("click", clearStorage);
backButton.on("click", pageSwap);
