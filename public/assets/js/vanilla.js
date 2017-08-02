function getJSONConfig(path){
 	var xhr = new XMLHttpRequest();
 	if(xhr && xhr != null){
	 	xhr.open('GET', path, false);
    trackJs.track('VANILLA JS: ' + path + ' is fetched');
	 	xhr.onreadystatechange = function(){ handleResponse(xhr); }
		xhr.send(null);
 	} else {
    trackJs.track('VANILLA JS: ' + 'xhr has bad value');
    displayErrorPage();
  }
}

function handleResponse(xhr){
	if(xhr.readyState === 4){
    if(xhr.status === 200) {
      if(xhr.responseText) {
        var config = JSON.parse(xhr.responseText);
        trackJs.track('VANILLA JS: ' + 'parsing json');
    		render(config);
      } else {
        trackJs.track('VANILLA JS: ' + 'no json data');
        displayErrorPage();
      }

    } else {
      trackJs.track('VANILLA JS: ' + 'error from the Ajax call')
      displayErrorPage();
    }

	} else {
    trackJs.track('VANILLA JS: ' + 'Ajax not ready');
    displayErrorPage();
  }
}

function render (config) {
	if(typeof config === 'undefined'){
		trackJs.track('VANILLA JS: ' + config + ' is undefined');
      console.log('enter');
    displayErrorPage();
	}

	var containerId = config.name === 'hiphop_config.json' ? 'btn-container-hip-hop' : 'btn-container-disney';
	var buttonId = config.name === 'hiphop_config.json' ? 'button-hip-hop' : 'button-disney';

	var btnContainer = document.getElementById(containerId);

	for( var index in config.buttons){
		var btn = config.buttons[index];
		var button = document.getElementById(buttonId);
		var image = button.content.querySelector('img');
		var audio = button.content.querySelector('audio');
		var source = button.content.querySelector('source');

		image.src = btn.img.src;
		image.alt = btn.img.alt;
		image.setAttribute('onclick', 'play(\'' + btn.audio.id + '\')');
		image.setAttribute('onerror', 'this.src=\'/assets/img/noimage.jpg\'');
		audio.id = btn.audio.id;

		source.src = btn.audio.src;
		source.type = btn.audio.type;

		btnContainer.appendChild(button.content.cloneNode(true));

    trackJs.track('VANILLA JS: ' + 'button ' + index + ' created');

	}
}

function switch_theme(theme) {
  trackJs.track('VANILLA JS: ' + 'theme changed to ' + theme);
	document.getElementById('theme_css').href = theme;
}

function switch_version(version) {
  trackJs.track('VANILLA JS: ' + 'verison is changed to ' + version);
	document.getElementById('format_css').href = version;
}

function play(audioSrc){
	var audio = document.getElementById(audioSrc);
	
	if(!audio.readyState >=2){
		return;	
	}
	
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}

function switch_beats(config){
	var disneyContainer  = document.getElementById('btn-container-disney');
	var hipHopContainer = document.getElementById('btn-container-hip-hop');
	if(config === '/assets/config/hip_hop_config.json'){
    trackJs.track('VANILLA JS: ' + 'Hip Hop version selected');
		disneyContainer.style.display = 'none';
		hipHopContainer.style.display = 'block';
	}
	else{
    trackJs.track('VANILLA JS: ' + 'Disney version selected');
		disneyContainer.style.display = 'block';
		hipHopContainer.style.display = 'none';
	}
}

function addSliderEventListeners(){
	var volumeSlider = document.getElementById('volume');
	var speedSlider = document.getElementById('speed');
	var audioSrcs = document.getElementsByTagName('audio');

	volumeSlider.addEventListener('change', function(){
    trackJs.track('VANILLA JS: ' + 'changing volume to ' + volumeSlider.value);
		sliderChange('volume', volumeSlider.value);
	});

	speedSlider.addEventListener('change', function(){
    trackJs.track('VANILLA JS: ' + 'change audio speed to ' + speedSlider.value);
		sliderChange('playbackRate', speedSlider.value);
	});
}

function sliderChange(attribute, value){
	var audioSrcs = document.getElementsByTagName('audio');

	for( var index in audioSrcs){
		if(attribute === 'volume'){
      trackJs.track('VANILLA JS: ' + 'changing volume');
			audioSrcs[index].volume = value
		}
		else{
      trackJs.track('VANILLA JS: ' + 'changing audio speed');
			audioSrcs[index].playbackRate = value

		}
	}
}

function displayErrorPage() {
  location.replace('./error-page.html');
}

window.onload = function(){
	getJSONConfig('/assets/config/hiphop_config.json');
	getJSONConfig('/assets/config/disney_config.json');
	document.getElementById("btn-container-disney").style.display = 'none';
	addSliderEventListeners();
	document.getElementById("loader").style.display = 'none';
	document.getElementById("error-page").style.display = 'none';
	
  	if('serviceWorker' in navigator) {
	    navigator.serviceWorker.register('/sw.js').then(function(registration) {
	    	// Registration was successful
	    	trackJs.track('Service worker was registered successfully');
	    }, function(err) {
		    debugger;
	    	// Probably want to do some sort of error handling here 
			trackJs.track('Oh no, something went wrong! Could not register service worker');
	    });
	}
}
