function getJSONConfig(path){
 	var xhr = new XMLHttpRequest();
 	if(xhr){
	 	xhr.open('GET', path, false); 
	 	xhr.onreadystatechange = function(){ handleResponse(xhr); }
		xhr.send(null); 	 
 	}
}

function handleResponse(xhr){
	if(xhr.readyState === 4 && xhr.status === 200){
		var config = JSON.parse(xhr.responseText);
		render(config);
	}
}

function render (config) {
	if(typeof config === 'undefined'){
		//throw error
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
		image.setAttribute("onclick", btn.img.onclick);
		audio.id = btn.audio.id;

		source.src = btn.audio.src;
		source.type = btn.audio.type;

		btnContainer.appendChild(button.content.cloneNode(true));		
	}
}

function switch_theme(theme) {
	document.getElementById('theme_css').href = theme;
	// trackJs.track('test check');
}

function play(audioSrc){
	var audio = document.getElementById(audioSrc);
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}

function switch_beats(config){
	var disneyContainer  = document.getElementById("btn-container-disney");
	var hipHopContainer = document.getElementById("btn-container-hip-hop");
	if(config === '../config/hip_hop_config.json'){
		disneyContainer.style.display = 'none'; 
		hipHopContainer.style.display = 'block';	
	}
	else{
		disneyContainer.style.display = 'block'; 
		hipHopContainer.style.display = 'none';	
	}
}

window.onload = function(){
	getJSONConfig('/assets/config/hiphop_config.json');
	getJSONConfig('/assets/config/disney_config.json');
	document.getElementById("btn-container-disney").style.display = 'none';
}    