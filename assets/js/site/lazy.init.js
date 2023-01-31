/**
 * Инициализирует отложенную загрузку изображений
 */
(function(w, d, $){

	var LazyLoadImg = new LazyLoad({
		elements_selector: "img.lazy",
		callback_loaded: function(element){
			$(element).removeClass('lazy');
		}
	});

	new LazyLoad({
		elements_selector: 'iframe[data-src]',
		threshold: 300
	});


	// Событие при загрузки HTML-блока, загруженного через AJAX
	d.addEventListener('ajax-html-loaded', function(event) {
		LazyLoadImg.update();
	});

})(window, document, $ || JQuery);
