/**
 * Находит на странице в зоне видимости все блоки динамической подгрузки .js--lazyContent и загружает в них контент для отображения
 */
(function(w, d, $){

	const filterField = '.js--specialist-filter-field';

	function htmlEntities(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	var updateQueryStringParameter = function (uri, key, value) {
		var re = new RegExp("([?&])" + key + "=.*?(&|#|$)", "i");
		if( value === undefined ) {
			if (uri.match(re)) {
				return uri.replace(re, '$1$2');
			} else {
				return uri;
			}
		} else {
			if (uri.match(re)) {
				return uri.replace(re, '$1' + key + "=" + value + '$2');
			} else {
				var hash =  '';
				if( uri.indexOf('#') !== -1 ){
					hash = uri.replace(/.*#/, '#');
					uri = uri.replace(/#.*/, '');
				}
				var separator = uri.indexOf('?') !== -1 ? "&" : "?";
				return uri + separator + key + "=" + value + hash;
			}
		}
	};

	$(filterField).on('change', function(){
		var name = $(this).attr('name'),
			value = $(this).val();

		var filter = {};
		filter[name] = value;

		window.location.href = updateQueryStringParameter(window.location.href, name, value);
		// console.log(filter);
	});

})(window, document, $ || JQuery);