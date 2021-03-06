function getJSONConfig(path){
 	var xhr = new XMLHttpRequest();
 	if(xhr && xhr != null){
	 	xhr.open('GET', path);
	 	track('VANILLA JS: ' + path + ' is fetched');
	 	xhr.onreadystatechange = function(){ handleResponse(xhr); }
		xhr.send(null);
 	} else {
  	track('VANILLA JS: ' + 'xhr has bad value');
		displayErrorPage();
  	}
}

function handleResponse(xhr){
	if(xhr.readyState === 4){
	    if(xhr.status === 200) {
	    	if(xhr.responseText) {
	        	var config = JSON.parse(xhr.responseText);
				track('VANILLA JS: ' + 'parsing json');
	    		render(config);
	      	} else {
	        	track('VANILLA JS: ' + 'no json data');
				displayErrorPage();
	      	}
		} else if(xhr.status === 400){
	      track('VANILLA JS: ' + 'error from the Ajax call, 400 error');
	      displayErrorPage();
	    }
	    else if(xhr.status === 500){
	      track('VANILLA JS: ' + 'error from the Ajax call, 500 error');
	      displayErrorPage();
	    }
	}
}

function render (config) {
	if(typeof config === 'undefined'){
		track('VANILLA JS: ' + config + ' is undefined');
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
		var span = button.content.querySelector('span');

		image.src = btn.img.src;
		image.alt = btn.img.alt;
		image.id = 'image'+btn.audio.id;
		image.setAttribute('onclick', 'play(\''+btn.audio.id+'\')');
    if(!(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)){
  		image.setAttribute('onerror', 'this.src=\'/assets/img/noimage.jpg\'');
    }
		audio.id = 'audio'+btn.audio.id;
		span.innerHTML = btn.audio.id;

		source.src = btn.audio.src;
		source.type = btn.audio.type;

		btnContainer.appendChild(button.content.cloneNode(true));

		track('VANILLA JS: ' + 'button ' + index + ' created');
	}
}

function switch_theme(theme) {
	track('VANILLA JS: ' + 'theme changed to ' + theme);
	document.getElementById('theme_css').href = theme;
}

function switch_version(version) {
	track('VANILLA JS: ' + 'verison is changed to ' + version);
	document.getElementById('format_css').href = version;
	var imgLabels = document.getElementsByTagName('span');

	if (version === '/assets/css/soundboard.css') {
    	for (var i = 0; i < imgLabels.length; i++) {
			imgLabels[i].style.display = 'none';
    	}
  	} else {
    	for (var i = 0; i < imgLabels.length; i++) {
			imgLabels[i].style.display = 'block';
    	}
  	}
}

function play(id){
	var audio = document.getElementById('audio'+id);
	var image = document.getElementById('image'+id);

	if(!audio.readyState >=2){
		return;
	}

	if (audio.paused) {
	    if(!image.classList.contains('active')) {
	    	image.classList.add('active');
	    }
	  	audio.play();
	}
	else {
		audio.pause();
	}

	audio.addEventListener('pause', function(){
		image.classList.remove('active');
	});

	audio.addEventListener('ended', function() {
	    image.classList.remove('active');
	});
}

function switch_beats(config){
	var disneyContainer  = document.getElementById('btn-container-disney');
	var hipHopContainer = document.getElementById('btn-container-hip-hop');
	if(config === '/assets/config/hip_hop_config.json'){
    track('VANILLA JS: ' + 'Hip Hop version selected');
		disneyContainer.style.display = 'none';
		hipHopContainer.style.display = 'block';
	}
	else{
    track('VANILLA JS: ' + 'Disney version selected');
		disneyContainer.style.display = 'block';
		hipHopContainer.style.display = 'none';
	}
}

function addSliderEventListeners(){
	var volumeSlider = document.getElementById('volume');
	var speedSlider = document.getElementById('speed');
	var audioSrcs = document.getElementsByTagName('audio');

	volumeSlider.addEventListener('change', function(){
    track('VANILLA JS: ' + 'changing volume to ' + volumeSlider.value);
		sliderChange('volume', volumeSlider.value);
	});

	speedSlider.addEventListener('change', function(){
    track('VANILLA JS: ' + 'change audio speed to ' + speedSlider.value);
		sliderChange('playbackRate', speedSlider.value);
	});
}

function sliderChange(attribute, value){
	var audioSrcs = document.getElementsByTagName('audio');

	for( var index in audioSrcs){
		if(attribute === 'volume'){
			track('VANILLA JS: ' + 'changing volume');
			audioSrcs[index].volume = value
		}
		else{
			track('VANILLA JS: ' + 'changing audio speed');
			audioSrcs[index].playbackRate = value
		}
	}
}

function track(message){
	if(navigator.onLine && typeof trackJs !== 'undefined'){
		trackJs.track(message);
	}
}

function displayErrorPage() {
	location.replace('/assets/html/error-page.html');
}

window.onload = function(){
	getJSONConfig('/assets/config/hiphop_config.json');
	document.getElementById("btn-container-disney").style.display = 'none';
	addSliderEventListeners();
	document.getElementById("loader").style.display = 'none';

  	if('serviceWorker' in navigator) {
	    navigator.serviceWorker.register('/sw.js').then(function(registration) {
	    	// Registration was successful
	    	track('Service worker was registered successfully');
	    }, function(err) {
	    	// Probably want to do some sort of error handling here
			track('Oh no, something went wrong! Could not register service worker');
	    });
	}
	function updateOnlineStatus(event) {
    	var onLineStatus = navigator.onLine ? "Your are now online" : "You are now offline";

		var x = document.getElementById("toast")
		x.innerHTML = onLineStatus;
		x.className = "show";
		setTimeout(function(){
			x.className = x.className.replace("show", "");
		}, 3000);
  	}
  	window.addEventListener('online',  updateOnlineStatus);
  	window.addEventListener('offline', updateOnlineStatus);
}

window.addEventListener('load', function(){
	getJSONConfig('/assets/config/disney_config.json');

}, false)
