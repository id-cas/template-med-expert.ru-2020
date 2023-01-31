$(document).ready(function(){

	// *****************************************
	// Hide dropdown blocks ********************
	// *****************************************
	$(document).mouseup(function (e){
		var div = $('.dropdown-active');
		var divDropdown = $('.dropdown-active').next();
		if (!div.is(e.target)
			&& div.has(e.target).length === 0
			&&!divDropdown.is(e.target)
			&& divDropdown.has(e.target).length === 0) {

			$('.dropdown-active').click();
		}
	});

	// *****************************************
	// Nav *************************************
	// *****************************************
	$('.header-nav-more-btn').on( 'click', function() {
		$(this).toggleClass('dropdown-active');
		$(this).next().toggleClass('active');
	});

	// *****************************************
	// Mob Nav *********************************
	// *****************************************
	$('.hamburger').on( 'click', function() {
		$(this).toggleClass('is-active');
		$('nav').toggleClass('active');
		$('body').toggleClass('nav-lock');
		$('html, body').animate({ scrollTop: 0 }, 300);
	});




	// *****************************************
	// Footer Lists ****************************
	// *****************************************
	$('.footer-list-title').on( 'click', function() {
		var windowWidth = $( window ).width();

		if (windowWidth < 992) {
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).next().slideUp();
			}
			else{
				$('.footer-list-title.active').next().slideUp();
				$('.footer-list-title.active').removeClass('active');
				$(this).addClass('active');
				$(this).next().slideDown();
			}
		}
	});

	// *****************************************
	// Prices **********************************
	// *****************************************
	$(document).on('click', '.prices-item-arrow', function() {
		$(this).toggleClass('active');
		$(this).parent().next().slideToggle();
	});

	// *****************************************
	// Tabs ************************************
	// *****************************************
	$('.tab-link').click(function(){
		var tabId = $(this).attr('tab-id');
		var tabCategory = $(this).attr('tab-category');

		$(this).parent().find('li').removeClass('active');
		$(this).addClass('active');

		$('.'+tabCategory).removeClass('active');
		$('#'+tabId).addClass('active');
	});

	$('.clinic-tabs-mob').on('click', function() {
		$(this).toggleClass('active dropdown-active');
		$(this).next().toggleClass('active');
	});

	$('.clinic-tabs li').on('click', function() {
		var mainWrap = $(this).parents('.clinic-tabs-wrap'),
			selectImg = $(this).find('img').attr('src');
		selectValue = $(this).text();

		mainWrap.find('.clinic-tabs-mob span').html(selectValue);
		mainWrap.find('.clinic-tabs-mob .clinic-tabs-mob-ico img').attr('src', selectImg);
		mainWrap.find('.clinic-tabs-mob').click();
	});

	// *****************************************
	// Fancybox *******************************
	// *****************************************

//	// *****************************************
//	// Clinic Map *******************************
//	// *****************************************
//	if ($('#clinic-map').length) {
//		var markerArray = [];
//		var icon = "resources/images/location.svg";
//		var map;
//		var bounds = new google.maps.LatLngBounds();
//		var mapOptions = {
//			mapTypeId: 'roadmap',
//			disableDefaultUI: true
//		};
//
//		// Display a map on the page
//		map = new google.maps.Map(document.getElementById("clinic-map"), mapOptions);
//		map.setTilt(45);
//
//		// Multiple Markers
//		var markers = [
//			['Clinics', 51.5073509, -0.1277583]
//
//		];
//
//		// Info Window Content
//		var infoWindowContent = [
//			['<div class="info-content">' +
//				'<div class="info-content-phone"><img src="resources/images/phone-ico.svg" alt="ico"><span>(1111) 111-111</span></div>'+
//				'<p>London, KRH London Fun Hotel</p>' +
//				'</div>']
//		];
//
//		// Display multiple markers on a map
//		var infoWindow = new google.maps.InfoWindow(), marker, i;
//
//		// Loop through our array of markers & place each one on the map
//		for( i = 0; i < markers.length; i++ ) {
//			var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
//			bounds.extend(position);
//			marker = new google.maps.Marker({
//				position: position,
//				icon: icon,
//				map: map,
//				title: markers[i][0]
//			});
//
//			// Allow each marker to have an info window
//			google.maps.event.addListener(marker, 'click', (function(marker, i) {
//				return function() {
//					infoWindow.setContent(infoWindowContent[i][0]);
//					infoWindow.open(map, marker);
//				}
//			})(marker, i));
//
//
//			markerArray[i] = marker;
//
//
//			// Automatically center the map fitting all markers on the screen
//			map.fitBounds(bounds);
//		}
//
//		// Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
//		var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
//			this.setZoom(14);
//			google.maps.event.removeListener(boundsListener);
//		});
//
//		google.maps.event.addListener(infoWindow, 'domready', function() {
//			var l = $('.gm-style .gm-style-iw-c');
//			var m = $('.gm-style .gm-style-iw-d');
//			for (var i = 0; i < l.length; i++) {
//				if($(l[i]).css('z-index') == 'auto') {
//					$(l[i]).css('border-radius', '4px');
//					$(l[i]).css('border', '1px solid #F4F4F4');
//					$(l[i]).css('padding', '0');
//				}
//			}
//			for (var i = 0; i < m.length; i++) {
//				if($(m[i]).css('z-index') == 'auto') {
//					$(m[i]).css('overflow', 'visible');
//				}
//			}
//		});
//	}
});
