function fetchJson(url, containerGroup) {
  $.ajax({
    method: "GET",
    url: url})
    .done(function(config) {
      trackJs.track('JQUERY: ' + url + ' is fetched');
      createTemplates(config, containerGroup);
  });
}

function createTemplates(config, containerGroup) {

  if (typeof config === 'undefined') {
    trackJs.track('JQUERY: ' + config + ' is undefined');
  }
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

    trackJs.track('JQUERY: ' + 'button ' + index + ' created');
  });
}

function switch_theme(theme) {
  trackJs.track('JQUERY: ' + 'theme changed to ' + theme);
  $('#theme_css').attr('href', theme);

}

function switch_version(version) {
  trackJs.track('JQUERY: ' + 'version changed to ' + version);
  $('#format_css').attr('href', version);
}

function switch_beats(config){
	var disneyContainer  = $("#btn-container-disney");
	var hipHopContainer = $("#btn-container-hip-hop");
	if(config === 'hiphop'){
    trackJs.track('JQUERY: ' + 'Hip Hop version selected');
		disneyContainer.hide();
		hipHopContainer.show();
	}
	else{
    trackJs.track('JQUERY: ' + 'Disney version selected');
		disneyContainer.show();
		hipHopContainer.hide();
	}
}

function addSliderEventListeners(){
	var volumeSlider = $('#volume');
	var speedSlider = $('#speed');
	var audioSrcs = $('audio');

	volumeSlider.change(function(){
    trackJs.track('JQUERY: ' + 'changing volumne');
		sliderChange('volume', volumeSlider.val());
	});

	speedSlider.change(function(){
    trackJs.track('JQUERY: ' + 'changing audio speed');
		sliderChange('playbackRate', speedSlider.val());
	});
}

function sliderChange(attribute, value){
	var audioSrcs = $('audio');
	for( var index in audioSrcs){
		if(attribute === 'volume'){
      trackJs.track('JQUERY: ' + 'changing volume to ' + value);
			audioSrcs[index].volume = value;
		}
		else{
      trackJs.track('JQUERY: ' + 'changing audio speed to ' + value);
			audioSrcs[index].playbackRate = value;
		}
	}
}

$(document).ready(function() {
  fetchJson('/assets/config/hiphop_config.json', '#btn-container-hip-hop');
  fetchJson('/assets/config/disney_config.json', '#btn-container-disney');
  $('#btn-container-disney').hide();
  addSliderEventListeners();
  $('#loader').hide();
});
