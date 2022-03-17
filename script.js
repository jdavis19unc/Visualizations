const { default: elementTypes } = require("react-html-parser/lib/elementTypes");

var id = null;
function myMove() {
  var elem = document.getElementById("myAnimation");
  var pos = 0;
  clearInterval(id);
  id = setInterval(frame, 20);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}

var id = null;
function moveBlock() {
  var elem = document.getElementById("mySquare");
  var pos = 0;
  clearInterval(id);
  id = setInterval(frame, 20);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + 'px';
      elem.style.left = pos + 'px';
    }
  }
}