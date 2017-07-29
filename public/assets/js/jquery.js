function switch_theme(theme) {
  $('#theme_css').attr('href', theme);
  // trackJs.track('test check');
}

$(document).ready(function() {
  $.ajax({
    method: "GET",
    url: "https://teamair-d90e1.firebaseapp.com/assets/config/hipHopConfig.json"})
    .done(function(hipHopConfig) {
      $.each(hipHopConfig.buttons, function( index ){
        var btn = hipHopConfig.buttons[index];

        var container = $('<div>');
        container.addClass('col imgcell');

        var img = $('<img>');
        img.attr('src', btn.img.src).attr('alt', btn.img.alt);

        var audio = $('<audio>');
        audio.attr('id', btn.audio.id).attr('controls', 1);

        var source = $('<source>');
        source.attr('src', btn.audio.src).attr('type', btn.audio.type);

        audio.append(source);

        container.append(img.on({
          'click': function() {
            var audio = '#' + btn.audio.id;
            if ($(audio).prop('paused')) {
              $(audio).trigger('play');
            } else {
              $(audio).trigger('pause');
            }
          }
        }));
        container.append(audio);

        $('#btn-container').append(container);
    });

  });
});
