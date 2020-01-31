$(document).ready(function () {
  var socket = io();

  $('form[name="msg"]').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#message').val());
    $('ul').append($('<li>').text($('#message').val()));
    $('#message').val('');
    $('#message').data('old', 0);
    return false;
  });

  $('#message').data('old', 0);

  $('#message').on("input", function(e){
    e.preventDefault(); // prevents page reloading
    var length = $("#message").val().length

    if ($('#message').data('old') === 0 && length === 1) {
      socket.emit('typing', true);
    }
    if ($('#message').data('old') === 1 && length === 0) {
      socket.emit('typing', false);
    }

    $('#message').data('old', length);
    
    return false;
  });

  $('form[name="usr"]').submit(function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('change name', $('#name').val());
    return false;
  });

  socket.on('chat message', function(msg){
    $('ul').append($('<li>').text(msg.user + ': ' + msg.message));
  });
  socket.on('user update', function(msg){
    $('ul').append($('<li class="info">').text(msg))
  })
});