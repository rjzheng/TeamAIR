function fetchJson(url, containerGroup) {
  $.ajax({
    method: "GET",
    url: url})
    .done(function(config) {
      createTemplates(config, containerGroup);
  });
}

function createTemplates(config, containerGroup) {
  $.each(config.buttons, function( index ){
    var btn = config.buttons[index];

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

    $(containerGroup).append(container);
  });
}

function switch_theme(theme) {
  $('#theme_css').attr('href', theme);
  // trackJs.track('test check');
}

function switch_version(version) {
  $('#format_css').attr('href', version);
}

function switch_beats(config){
	var disneyContainer  = $("#btn-container-disney");
	var hipHopContainer = $("#btn-container-hip-hop");
	if(config === 'hiphop'){
		disneyContainer.hide();
		hipHopContainer.show();
	}
	else{
		disneyContainer.show();
		hipHopContainer.hide();
	}
}

$(document).ready(function() {
  fetchJson('/assets/config/hiphop_config.json', '#btn-container-hip-hop');
  fetchJson('/assets/config/disney_config.json', '#btn-container-disney');
  $('#btn-container-disney').hide();
});
