/**
 * Находит на странице в зоне видимости все блоки динамической подгрузки .js--lazyContent и загружает в них контент для отображения
 */
(function(w, d, $){

	const resultSection = '#js--search-result';

	var getParam = function (str) {
		var v = window.location.search.match(new RegExp('(?:[\?\&]'+str+'=)([^&]+)'));
		return v ? decodeURI(v[1]) : null;
	};

	var highlight = function (elem, str){
		/** Documentation https://markjs.io/ */
		var instance = new Mark(elem);


		// Выделим отдельные слова, если это был составной запрос
		var subStrArr = str.split('+', 10);

		for(var i = 0; i < subStrArr.length; i++){
			// Выделим искомую строку
			instance.mark(subStrArr[i]);

			// Еще попробуем выделить подстроку (морфологически), уберем последнию 1 или 2 гласные буквы
			instance.mark(subStrArr[i].replace(/[аеёийоуыэюяь]+$/i, ''));
		}
	};

	var searchString = getParam('search_string');

	/** Выполнять скрипт только на страница поиска */
	if(searchString.trim() == ''){
		return;
	}

	searchString = searchString.replace(/ё/g, 'е').replace(/Ё/g, 'Е');

	/** Попробуем подсветить все комбинации */
	highlight(document.querySelector(resultSection), searchString);


	// Событие при загрузки HTML-блока, загруженного через AJAX
	d.addEventListener('ajax-html-loaded', function(event) {
		highlight(event.detail.elem, searchString);


		// Спрячем блоки, в которых ничего не было найдено (ТОЛЬКО если родитель не был выделен)
		$(event.detail.elem).find('.prices-detail').each(function(){
			// Если найдено в коротком описании родителя
			if($(this).parents('.prices-item').find('.prices-detail-descr-group mark').length > 0){
				return;
			}

			// Если найдено в родителе
			if($(this).parents('.prices-item').find('.prices-item-title mark').length > 0){
				return;
			}

			if($(this).find('mark').length === 0){
				// $(this).hide();
			}
		});
	});


})(window, document, $ || JQuery);