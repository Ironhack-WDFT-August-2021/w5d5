mapboxgl.accessToken = 'pk.eyJ1Ijoiam5yZG1ubiIsImEiOiJja2wxN3VtY28zaDdlMm5xbjV5Znh0YnBpIn0.s0Cz8vhJe3T1N2wvocwFzw';
const center = [13.4532321, 52.5331092];
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/jnrdmnn/ckl1aoosu0afb17r27yya1ti5', // style URL
	center: center, // starting position [lng, lat]
	// if you want to disable double click zoom
	doubleClickZoom: false,
	// get the location of the user using the navigator object
	// navigator.geolocation.getCurrentPosition(function(pos){console.log(pos.coords)});
	zoom: 12, // starting zoom
	// pitch: 100
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

// setting a popup
// const popup = new mapboxgl.Popup({
// 	closeButton: true
// });

// popup.setLngLat(center)
// 	.setHTML('<h1>Hello 👋</h1>')
// 	// .setMaxWidth('200px')
// 	.addTo(map)

const coords = [
	[13.405, 52.52],
	[13.6, 52.6]
]

coords.forEach(function (coord) {
	new mapboxgl.Marker({
		color: 'red',
		draggable: true
	})
		.setLngLat(coord)
		.addTo(map);
})

const addMarker = event => {
	new mapboxgl.Marker({
		color: 'red',
		draggable: true
	})
		.setLngLat(event.lngLat)
		.addTo(map)
		.on('dragend', event => {
			console.log(event.target._lngLat)
			// axios.post(to the server)
		})
}

map.on('click', addMarker)

// map.on('click', (event) => {
// 	// console.log('i clicked on the map')
// 	// console.log(event.lngLat);

// })

// new mapboxgl.Marker({
// 	color: 'red'
// })
// 	.setLngLat(center)
// 	.addTo(map);

