var id;
console.log('test');
$('#duration-modal').on('show.bs.modal', function (event) {
  console.log('shown');
  var button = $(event.relatedTarget);
  id = button.data('id');
});

$('#final-mute-button').on('click', function() {
  var radio_selected = $('#choices input:radio:checked').val();
  console.log(radio_selected + " " + id);
  $.ajax({
    url: '/prepare-data',
    data: {
      duration: radio_selected,
      id: id
    }
  });
});