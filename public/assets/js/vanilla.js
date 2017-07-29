
function getHipHopConfig(){
 var jsonText = '{ "name": "hiphop_config.json", "buttons": [ { "img": { "src": "./../../assets/img/silhouette1.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio1\')" }, "audio": { "id": "audio1", "src": "./../../assets/mp3/beat1.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette2.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio2\')" }, "audio": { "id": "audio2", "src": "./../../assets/mp3/beat2.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette3.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio3\')" }, "audio": { "id": "audio3", "src": "./../../assets/mp3/beat3.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette4.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio4\')" }, "audio": { "id": "audio4", "src": "./../../assets/mp3/beat4.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette5.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio5\')" }, "audio": { "id": "audio5", "src": "./../../assets/mp3/beat5.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette6.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio6\')" }, "audio": { "id": "audio6", "src": "./../../assets/mp3/beat6.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette7.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio7\')" }, "audio": { "id": "audio7", "src": "./../../assets/mp3/dj-scratch.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette8.png", "alt": "hip hop silhouette", "onclick": "play(\'audio8\')" }, "audio": { "id": "audio8", "src": "./../../assets/mp3/beat8.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette9.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio9\')" }, "audio": { "id": "audio9", "src": "./../../assets/mp3/lightbulb.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette10.png", "alt": "hip hop silhouette", "onclick": "play(\'audio10\')" }, "audio": { "id": "audio10", "src": "./../../assets/mp3/suspense.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette11.png", "alt": "hip hop silhouette", "onclick": "play(\'audio11\')" }, "audio": { "id": "audio11", "src": "./../../assets/mp3/jab.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette12.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio12\')" }, "audio": { "id": "audio12", "src": "./../../assets/mp3/order.mp3", "type": "audio/mpeg" } } ] }';

 return JSON.parse(jsonText);
}

function render (hipHopConfig) {
	if(typeof hipHopConfig === 'undefined'){
		//throw error
	}

	var btnContainer = document.getElementById("btn-container");
	for( var index in hipHopConfig.buttons){
		var btn = hipHopConfig.buttons[index];
		var button = document.getElementById("button");
		var image = button.content.querySelector('img');
		var audio = button.content.querySelector('audio');
		var source = button.content.querySelector('source');

		image.src = btn.img.src;
		image.alt = btn.img.alt;

		audio.id = btn.audio.id;

		source.src = btn.audio.src;
		source.type = btn.audio.type;

		btnContainer.appendChild(button.content.cloneNode(true));
		document.getElementsByTagName('img')[index].addEventListener('click',  
		(function() {
		      var audio = document.getElementById(btn.audio.id);
		      if (audio.paused) {
		        audio.play();
		      } else {
		        audio.pause();
		      }
	  	})(),false);
	}
}

    function switch_theme(theme) {
      document.getElementById('theme_css').href = theme;
      // trackJs.track('test check');
    }
    
var hipHopConfig = getHipHopConfig();
render(hipHopConfig)
