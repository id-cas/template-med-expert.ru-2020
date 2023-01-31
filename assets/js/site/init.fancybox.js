(function (window, d, $){
	'use strict';

	if(typeof $ === 'undefined') {
		return;
	}

	// Fancybox
	$('.js--onclick-fancybox').fancybox();
	$('.js--onclick-fancybox-group').fancybox({
		loop: true,
		buttons: [
			"close"
		],
		arrows: true,
		infobar: true
	});
	$( document ).on( 'click', '.js--onclick-fancyboxManual', function ( event ) {
		event.preventDefault();
		$.fancybox.open( {
			href: this.getAttribute( 'href' )
		} );
	} );

	d.addEventListener('ajax-html-loaded', function(event) {
		if(typeof event.detail.elem === 'undefined'){
			return false;
		}

		$(event.detail.elem).find('.js--onclick-fancybox').fancybox();
		$(event.detail.elem).find('.js--onclick-fancybox-group').fancybox({
			loop: true,
			buttons: [
				"close"
			],
			arrows: true,
			infobar: true
		});
	});

})(window, document, ($ || jQuery));