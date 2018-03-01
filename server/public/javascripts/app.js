$(function() {
  $('#cc-form').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: '/users',
      method: 'POST',
      data: $(this).serialize(),
      success: function() {

      }
    });

    return false;
  });
});
