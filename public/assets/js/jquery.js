function getHipHopConfig(){
 var jsonText = '{ "name": "hiphop_config.json", "buttons": [ { "img": { "src": "./../../assets/img/silhouette1.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio1\')" }, "audio": { "id": "audio1", "src": "./../../assets/mp3/beat1.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette2.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio2\')" }, "audio": { "id": "audio2", "src": "./../../assets/mp3/beat2.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette3.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio3\')" }, "audio": { "id": "audio3", "src": "./../../assets/mp3/beat3.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette4.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio4\')" }, "audio": { "id": "audio4", "src": "./../../assets/mp3/beat4.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette5.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio5\')" }, "audio": { "id": "audio5", "src": "./../../assets/mp3/beat5.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette6.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio6\')" }, "audio": { "id": "audio6", "src": "./../../assets/mp3/beat6.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette7.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio7\')" }, "audio": { "id": "audio7", "src": "./../../assets/mp3/dj-scratch.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette8.png", "alt": "hip hop silhouette", "onclick": "play(\'audio8\')" }, "audio": { "id": "audio8", "src": "./../../assets/mp3/beat8.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette9.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio9\')" }, "audio": { "id": "audio9", "src": "./../../assets/mp3/lightbulb.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette10.png", "alt": "hip hop silhouette", "onclick": "play(\'audio10\')" }, "audio": { "id": "audio10", "src": "./../../assets/mp3/suspense.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette11.png", "alt": "hip hop silhouette", "onclick": "play(\'audio11\')" }, "audio": { "id": "audio11", "src": "./../../assets/mp3/jab.mp3", "type": "audio/mpeg" } }, { "img": { "src": "./../../assets/img/silhouette12.jpeg", "alt": "hip hop silhouette", "onclick": "play(\'audio12\')" }, "audio": { "id": "audio12", "src": "./../../assets/mp3/order.mp3", "type": "audio/mpeg" } } ] }';

 return JSON.parse(jsonText);
}


function render (hipHopConfig) {
  if(typeof hipHopConfig === 'undefined') {
    // throw error
  }

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

}

function switch_theme(theme) {
  $('#theme_css').attr('href', theme);
  // trackJs.track('test check');
}

var hipHopConfig = getHipHopConfig();
render(hipHopConfig);
