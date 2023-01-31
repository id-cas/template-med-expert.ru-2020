/**
 * Инициализирует отложенную загрузку карты
 */
(function(w, d, $){
	var initMap = function(google, mapElem){

		// *****************************************
		// Map *************************************
		// https://developers.google.com/maps/documentation/javascript/
		// *****************************************
		if (typeof mapElem !== 'undefined') {
			var markerArray = [];
			var icon = "/resources/images/location.svg";
			var map;
			var bounds = new google.maps.LatLngBounds();
			var mapOptions = {
				mapTypeId: 'roadmap',
				disableDefaultUI: true,
				center: { lat: 54.7196161, lng: 20.4897616 }
			};

			// Display a map on the page
			map = new google.maps.Map(mapElem, mapOptions);
			map.setTilt(45);

			if(typeof w['mapClinics'] === 'undefined') {
				return;
			}


			// Multiple Markers
			var markers = [];
			var infoWindowContent = [];
			var keys = Object.keys(w['mapClinics']);
			for(var i = 0; i < keys.length; i++){
				if(typeof w['mapClinics'][keys[i]]['coordinates'] === 'undefined'){
					continue;
				}

				var coordinates = w['mapClinics'][keys[i]]['coordinates'].split(',');

				if(coordinates.length !== 2){
					continue;
				}

				// Markers positions
				markers[keys[i]] = {
					title: w['mapClinics'][keys[i]]['address'],
					lat: parseFloat(coordinates[0]),
					lng: parseFloat(coordinates[1])
				};

				// Info Window Content
				// var phone = w['mapClinics'][keys[i]]['phone'];
				// var phoneFormat = w['mapClinics'][keys[i]]['phone-format'];
				var address = w['mapClinics'][keys[i]]['address'];

				var phonesHtml = '';
				var phones = w['mapClinics'][keys[i]]['phones'];

				for(var j = 0; j < phones.length; j++){
					phonesHtml += '<div class="info-content-phone"><img src="/resources/images/phone-ico.svg" alt="ico"><a href="tel:' + phones[j]['num'] + '"><b>' + phones[j]['format'] + '</b></a></div>';
				}


				infoWindowContent[keys[i]] =
					'<div class="info-content">' +
						phonesHtml +
						'<p>' + address + '</p>' +
					'</div>';
			}


			// Display multiple markers on a map
			var infoWindow = new google.maps.InfoWindow(), marker, i;

			// Loop through our array of markers & place each one on the map
			var markersIds = Object.keys(markers);
			for( i = 0; i < markersIds.length; i++ ) {
				var markersId = markersIds[i];

				var position = new google.maps.LatLng(markers[markersId]['lat'], markers[markersId]['lng']);
				bounds.extend(position);
				marker = new google.maps.Marker({
					position: position,
					icon: icon,
					map: map,
					title: markers[markersId]['title']
				});
				marker.set("id", markersId);

				// Allow each marker to have an info window
				google.maps.event.addListener(marker, 'click', (function(marker, i) {
					return function() {
						infoWindow.setContent(infoWindowContent[marker['id']]);
						infoWindow.open(map, marker);
					}
				})(marker, i));


				markerArray[i] = marker;


				// Automatically center the map fitting all markers on the screen
				// map.fitBounds(bounds);

				// Set to specified position
				if(typeof w['mapClinics'][keys[i]]['selected'] !== 'undefined'){

					if(w['mapClinics'][keys[i]]['selected'] === true){
						map.panTo({lat: markers[markersIds[i]]['lat'], lng: markers[markersIds[i]]['lng']});
					}

				}
			}

			// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
			var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
				this.setZoom(14);
				google.maps.event.removeListener(boundsListener);
			});

			google.maps.event.addListener(infoWindow, 'domready', function() {
				var l = $('.gm-style .gm-style-iw-c');
				var m = $('.gm-style .gm-style-iw-d');
				for (var i = 0; i < l.length; i++) {
					if($(l[i]).css('z-index') == 'auto') {
						$(l[i]).css('border-radius', '4px');
						$(l[i]).css('border', '1px solid #F4F4F4');
						$(l[i]).css('padding', '0');
					}
				}
				for (var i = 0; i < m.length; i++) {
					if($(m[i]).css('z-index') == 'auto') {
						$(m[i]).css('overflow', 'visible');
					}
				}
			});
		}

		$('.clinics-map-list-title').on( 'click', function() {

			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).next().slideUp();
			}
			else{
				$('.clinics-map-list-title.active').next().slideUp();
				$('.clinics-map-list-title.active').removeClass('active');
				$(this).addClass('active');
				$(this).next().slideDown();
			}

		});

		$(".clinics-map-list li").click(function(){
			var markerId = $(this).attr('data-map');

			for(var i = 0; i < markerArray.length; i++){
				if(markerArray[i]['id'] == markerId){
					google.maps.event.trigger(markerArray[i], 'click');
					// map.setCenter({lat: markers[markerId]['lat'], lng: markers[markerId]['lng']});
					map.panTo({lat: markers[markerId]['lat'], lng: markers[markerId]['lng']});
					break;
				}
			}

		});

		$(".map-select-mob select").change(function(){
			var markerId = $(this).val();

			for(var i = 0; i < markerArray.length; i++){
				if(markerArray[i]['id'] == markerId){
					google.maps.event.trigger(markerArray[i], 'click');
					// map.setCenter({lat: markers[markerId]['lat'], lng: markers[markerId]['lng']});
					map.panTo({lat: markers[markerId]['lat'], lng: markers[markerId]['lng']});
					break;
				}
			}

		});
	};


	// Событие подверждающее что функционал карты загружен, можно ее иницииализировать для отображения
	d.addEventListener('gmap-loaded', function(event) {
		var mapLoadHdr = setInterval(function(){
			if(typeof google !== 'undefined'){
				clearInterval(mapLoadHdr);
				mapLoadHdr = null;

				initMap(google, event.detail.elem);
			}
		}, 150);
	});

})(window, document, $ || JQuery);
