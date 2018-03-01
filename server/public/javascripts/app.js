$(function() {
  $('#cc-form').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: '/users',
      method: 'POST',
      data: $(this).serialize(),
      success: function(data) {
        alert('Thank you, come again!');
      },
      error: function(data) {
        alert('Something went wrong...');
      }
    });

    return false;
  });
});
