$(document).ready(function(){
  console.log('ready');

  // a cross reference of area names to text to be shown for each area
  var xref = {
    Hopper: "You are in Hopper.",
    Faraday: "You are in Faraday.",
    Borg: "You are in Borg.",
    Kay: "You are in Kay.",
    Lovelace: "You are in Lovelace.",
    HallwayInside: "You are in the inside Hallway.",
    Swartz: "You are in Swartz.",
    Turing: "You are in Turing.",
    Babbage: "You are in Babbage.",
    HallwayOutside: "You are in the outside Hallway.",
    Restroom: ""
    };
    
  var defaultDipTooltip = 'Are you looking for someone?';
    
  var image = $('#mapimage');

  image.mapster(
  {
    fillOpacity: 0.4,
    fillColor: "d42e16",
    stroke: true,
    strokeColor: "3320FF",
    strokeOpacity: 0.8,
    strokeWidth: 4,
    singleSelect: true,
    mapKey: 'name',
    listKey: 'name',
    showToolTip: true,
    toolTipClose: ["tooltip-click", "area-click"],
  });
});


var getCurrentRoom = function(){
  // get coords of the div
  var pos = $("#person").position();
  var x = pos.left;
  var y = pos.top;

  var room = getRoomNameFromCoordinates(x, y);

  return room;
}

// checks each room and returns name of the room that given x,y coordinates is inside of.
var getRoomNameFromCoordinates = function(x,y){

  // loop thru all rooms, check if x y coordinates are inside the room coordinates
  var rooms = $('#map').children();
  
  for( i = 0; i < rooms.length; i++ ){
    // console.log ('Checking Room Name : ' + name + "\t Coords: " + rooms[i].coords );

    // check if the coordinates are inside the current room!
    var inRoom = PolyK.ContainsPoint( rooms[i].coords.split(','), x, y) ;

    if ( inRoom === true ){
      return rooms[i].id;
    }
  }
  return "Not in a room!";
};


var lastRoom = 0;

var pickRandomRoom = function(){
  var numberOfRooms = $('#map').children().length;
  var randomNumber = lastRoom;

  while (lastRoom === randomNumber){
    randomNumber = Math.floor((Math.random()* numberOfRooms));
  }

  lastRoom = randomNumber;

  return randomNumber;
};

var getRandomRoomCoords = function(){
  var selectedRoom = pickRandomRoom();
  var rooms = $('#map').children();

  console.log('Selected Room : # ' + selectedRoom + ' -  ' + rooms[selectedRoom].id);
  var roomCoordinates = rooms[selectedRoom].coords;

  var coordsArray = roomCoordinates.split(",");

  var xTotal = 0;
  var yTotal = 0;

  for ( i = 0; i < coordsArray.length; i++ ){
    if (i === 0 || i % 2 === 0){
      xTotal += coordsArray[i]*1;
    } else {
      yTotal += coordsArray[i]*1;
    }
  }

  var x = xTotal / (coordsArray.length/2);
  var y = yTotal / (coordsArray.length/2);

  return Math.floor(x) + "," + Math.floor(y);
};


var setPersonCoords = function(coords){
  console.log(coords);

  var x = coords.split(",")[0];
  var y = coords.split(",")[1];

  $("#person").css('left', x).css('top', y);

};

var move = 0;
var maxMoves = 99;

var newGame = function(){
  move = 0;
  maxMoves = randomMoves();
  setPersonCoords(getRandomRoomCoords());
};

var randomMoves = function(){
  var count = Math.floor((Math.random()* 10));
  return count;
};


var play = function(){
  move += 1;
    if( move < maxMoves){

    // get room name from coordinates
    var currentRoom = getCurrentRoom();

      switch ( currentRoom.toLowerCase() ){
        case "restroom":
          alert("Some privacy please!!!");
          break;
        case "kay":
        case "turing":
          alert("Can you wait until the lecture is done?");
          break;
        case "babbage":
          alert("Got some serious business to do. Will be back!");
          break;    
      }

    setPersonCoords(getRandomRoomCoords());
          
    } else {
      alert("YOU GOT HIM !!");
      newGame();
    }
};
