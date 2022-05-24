var highscoresBox = $("#highscores");

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
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
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

renderHighscores();
