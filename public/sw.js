var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
	'/',
	'/index.html',
	'/assets/html/css_soundboard.html',
	'/assets/html/noscript.html',
	'/assets/js/vanilla.js',
	'/assets/config/hiphop_config.json',
	'/assets/config/disney_config.json',
	'/assets/css/hype-theme.css',
	'/assets/css/mint-theme.css',
	'/assets/css/noscript.css',
	'/assets/css/original-theme.css',
	'/assets/css/soundboard.css',
	'/assets/img/background.png',
	'/assets/img/cinderella.jpg',
	'/assets/img/cruella.jpg',
	'/assets/img/hercules.jpg',
	'/assets/img/jiminy.jpeg',
	'/assets/img/junglebook.jpg',
	'/assets/img/kuzco.jpg',
	'/assets/img/lightning.png',
	'/assets/img/lionking.jpeg',
	'/assets/img/loading.gif',
	'/assets/img/mermaid.jpeg',
	'/assets/img/mulan.jpeg',
	'/assets/img/noimage.jpg',
	'/assets/img/render-phone.png',
	'/assets/img/render-wide-desktop.png',
	'/assets/img/silhouette1.jpeg',
	'/assets/img/silhouette2.jpeg',
	'/assets/img/silhouette3.jpeg',
	'/assets/img/silhouette4.jpeg',
	'/assets/img/silhouette5.jpeg',
	'/assets/img/silhouette6.jpeg',
	'/assets/img/silhouette7.jpeg',
	'/assets/img/silhouette8.png',
	'/assets/img/silhouette9.jpeg',
	'/assets/img/silhouette10.png',
	'/assets/img/silhouette11.png',
	'/assets/img/silhouette12.jpeg',
	'/assets/img/tangled.jpg',
	'/assets/img/toystory.jpeg',
	'/assets/mp3/applause.mp3',
	'/assets/mp3/beat1.mp3',
	'/assets/mp3/beat2.mp3',
	'/assets/mp3/beat3.mp3',
	'/assets/mp3/beat4.mp3',
	'/assets/mp3/beat5.mp3',
	'/assets/mp3/beat6.mp3',
	'/assets/mp3/beat7.mp3',
	'/assets/mp3/beat8.mp3',
	'/assets/mp3/beLikeYou.mp3',
	'/assets/mp3/bibbity.mp3',
	'/assets/mp3/cruella.mp3',
	'/assets/mp3/dj-scratch.mp3',
	'/assets/mp3/emperor.mp3',
	'/assets/mp3/evil-laugh-cackle.mp3',
	'/assets/mp3/jab.mp3',
	'/assets/mp3/lightbulb.mp3',
	'/assets/mp3/lionKing.mp3',
	'/assets/mp3/mermaid.mp3',
	'/assets/mp3/mulan.mp3',
	'/assets/mp3/muses.mp3',
	'/assets/mp3/night-time.mp3',
	'/assets/mp3/no-mercy.mp3',
	'/assets/mp3/order.mp3',
	'/assets/mp3/piano_B3.mp3',
	'/assets/mp3/red-alert.mp3',
	'/assets/mp3/suspense.mp3',
	'/assets/mp3/tangled.mp3',
	'/assets/mp3/toystory.mp3',
	'/assets/mp3/waves.mp3',
	'/assets/mp3/wholeNewWorld.mp3',
	'/assets/mp3/wishUponAStar.mp3'
];

self.addEventListener('install', function(event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	    .catch(function(e){
			debugger;
			console.log('Something went wrong during the fetch event');
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
	caches.match(event.request)
	  .then(function(response) {
	    // Cache hit - return response
	    if(!response || response.status !== 200 || response.type !== 'basic') {
			return fetch(event.request);
        }
	    return response;
	  }
	)
	.catch(function(){
		debugger;
		console.log('Something went wrong during the fetch event');
		return fetch(event.request);

	})
	);
});
