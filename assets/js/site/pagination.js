/**
 * Находит на странице в зоне видимости все блоки динамической подгрузки .js--lazyContent и загружает в них контент для отображения
 */
(function(w, $){

	const   scope = '.js--items-scope',
			items = '.js--items',
			pagination = '.js--items-pagination';

	var uuid = function () {
		return (new Date().getTime() * Math.random()).toFixed();
	};

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


	window.cwrk = window.cwrk ? window.cwrk : {};
	window.cwrk.showMoreItems = function(btn){
		var $btn = $(btn);

		var total = parseInt($btn.data('total')),
			page = parseInt($btn.data('page')),
			nextPage = page + 1;

		// Удалим кнопку "Показать еще" вместе с родительским блоком
		$btn.parent(pagination).remove();

		var $scope = $(scope);
		if($scope.length === 0){
			return;
		}

		var itemsBlocks = $scope.find(items);
		if(itemsBlocks.length === 0){
			return;
		}

		// Получим набор параметров для lazy-блока
		var $lastItemsBlock = $(itemsBlocks[itemsBlocks.length - 1]),
			$lastItemsBlockLazyParent = $lastItemsBlock.parent('.lazy-html');

		var path = $lastItemsBlockLazyParent.data('path'),
			params = $lastItemsBlockLazyParent.data('params');

		params = htmlEntities(JSON.stringify(params));


		// Добавим в контейнер новый блок для асинхронной подгрузки
		var uniqId = 'js--items-' + uuid();
		$scope.append('<div id="' + uniqId + '" class="lazy-html lazy-html--init" data-path="' + path + '" data-params="' + params + '" data-page="' + nextPage + '"></div>');

		window.cwrk.lazyLoadHtml('#' + uniqId);
	};

	window.changePage = function(e, p){
		e.preventDefault();

		window.location.href = updateQueryStringParameter(window.location.href, 'p', p);

		return;
	}

})(window, $ || JQuery);