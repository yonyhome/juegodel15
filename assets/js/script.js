var tiles = document.querySelectorAll(".tile");
var emptyTile = document.getElementById("tile-16");

for (var i = 0; i < tiles.length; i++) {
  tiles[i].addEventListener("mousedown", function(event) {
    var target = event.target;
    target.setAttribute("draggable", "true");
  });

  tiles[i].addEventListener("mouseup", function(event) {
    var target = event.target;
    target.setAttribute("draggable", "false");
  });

  tiles[i].addEventListener("dragstart", function(event) {
    var target = event.target;
    event.dataTransfer.setData("text/plain", target.id);
  });
}

emptyTile.addEventListener("dragover", function(event) {
  event.preventDefault();
});

emptyTile.addEventListener("drop", function(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var target = document.getElementById(data);
  var emptyTileIndex = getTileIndex(emptyTile);
  var targetIndex = getTileIndex(target);
  var emptyTileRow = Math.floor(emptyTileIndex / 4);
  var targetRow = Math.floor(targetIndex / 4);
  var emptyTileCol = emptyTileIndex % 4;
  var targetCol = targetIndex % 4;
  
  if (emptyTileRow == targetRow && Math.abs(emptyTileCol - targetCol) == 1 || emptyTileCol == targetCol && Math.abs(emptyTileRow - targetRow) == 1) {
    emptyTile.parentNode.insertBefore(target, emptyTile);
  }
});

function getTileIndex(tile) {
  var tiles = document.querySelectorAll(".tile");
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i] == tile) {
      return i;
    }
  }
}

