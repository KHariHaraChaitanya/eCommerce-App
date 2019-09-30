$(document).ready(function(e) {
   $("#location-map-block").hide();
	$("#location_slider_item_block").click(function(){
		$("#slider-banner-section,#location-map-block").slideToggle("slow");
		initmap();
		
	});
	$("#location-link-item").click(function(){
		$("#slider-banner-section,#location-map-block").slideToggle("slow");
	}); 
});		

// home page map section
function initmap() {
  var map = new google.maps.Map(document.getElementById("location-homemap-block"), {
	zoom:8,
	scrollwheel: false ,
	center: new google.maps.LatLng(22.2587, 71.1924), // Gujarat
	
	styles: [
	{
		"featureType": "administrative",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#646464"
			}
		]
	},
	{
		"featureType": "landscape",
		"elementType": "all",
		"stylers": [
			{
				"color": "#e2e2e2"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "all",
		"stylers": [
			{
				"saturation": -100
			},
			{
				"lightness": 45
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "simplified"
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels.icon",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "transit",
		"elementType": "all",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "all",
		"stylers": [
			{
				"color": "#01273a"
			},
			{
				"visibility": "on"
			}
		]
	}
]		
});    
setMarkers(map);
}	

var item_location = [
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0476, Oslo 1', 22.2587,71.1924, 5,'ic_1.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0426, Oslo 2', 21.9619,70.7923, 3,'ic_2.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 22.3039,70.8022, 1,'ic_3.png'],	  
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0476, Oslo 1', 22.7739,71.6673, 5,'ic_1.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0426, Oslo 2', 21.5222,70.4579, 3,'ic_2.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 21.4445,71.2874, 1,'ic_3.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0476, Oslo 1', 21.6417,69.6993, 5,'ic_1.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0426, Oslo 2', 21.7645,72.1519, 3,'ic_2.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 22.8120,70.8236, 1,'ic_3.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0476, Oslo 1', 23.0225,72.5714, 5,'ic_1.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0426, Oslo 2', 23.2420,69.6669, 3,'ic_2.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 22.6916,72.8634, 1,'ic_3.png'],	  
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 22.3072,73.1812, 2,'ic_2.png'],	  
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 21.1702,72.8311, 4,'ic_1.png'],	  
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 23.0753,70.1337, 1,'ic_3.png'],	  
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 21.7051,72.9959, 3,'ic_2.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 21.1257,73.1121, 5,'ic_3.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 22.4195,74.5668, 7,'ic_1.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 23.3473,70.5830, 4,'ic_3.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 23.0145,71.1788, 6,'ic_2.png'],  
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 22.7788,73.6143, 1,'ic_1.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 22.0896,69.2788, 5,'ic_3.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 21.8999,69.3161, 4,'ic_1.png'],
  ['Gujarat', 'Courier & Courier', 'Gujarat, Oslo, 15G, Torshovgata, Sagene, 0438, Oslo 3', 22.4649,69.0702, 1,'ic_1.png'],
];	
function setMarkers(map) {	
	var shape = {
	  coords: [1, 1, 1, 52, 50, 52, 50, 1],
	  type: 'poly'
	};
	for (var i = 0; i < item_location.length; i++) {
		var item = item_location[i];
		var image = {
		  url: 'images/'+item[6],
		  
		  size: new google.maps.Size(61, 72),
		  
		  origin: new google.maps.Point(0, 0),
		  
		  anchor: new google.maps.Point(0, 53)
		};
		var infoWindow = new google.maps.InfoWindow({
			content: item[0],
		});
		var marker = new google.maps.Marker({
		position: {lat: item[3], lng: item[4]},
		animation: google.maps.Animation.DROP,
		map: map,
		icon: image,
		shape: shape,
		title: item[0],
		zIndex: item[5]
	  });
	  (function (marker, item) {
			google.maps.event.addListener(marker, "click", function (e) {
				//Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
				infoWindow.setContent("<div style = 'width:250px;min-height:50px' id='m-info-window'> <h6 class='info-window-hding'>" + item[1] + "</h6> <p class='info-window-desc'>" + item[2] + "</p> </div>");
				infoWindow.open(map, marker);
			});                
		})(marker, item);
	}
  }   