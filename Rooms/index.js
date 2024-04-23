document.getElementById('addRoom').addEventListener('click', function() {
    var newRoom = document.createElement('button');
    newRoom.textContent = 'Room ' + (document.querySelectorAll('.rooms button').length - 1);
    document.querySelectorAll('.left-rooms button') 
      document.querySelector('.left-rooms').appendChild(newRoom);
        document.querySelector('.right-rooms').appendChild(newRoom);

});

document.getElementById('okButton').addEventListener('click', function() {
    // Your code for handling the OK button click event goes here
});