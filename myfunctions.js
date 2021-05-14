

function update(id, content) {
  document.getElementById(id).innerHTML = content;
}

//hidden or visible
function divVisibility (elementid, display){
  var x = document.getElementById(elementid);
    x.style.visibility = display;
}

function tabs(id, content) {
  document.getElementById(id).style.display = content;
}
