/**
 * Находит на странице в зоне видимости все блоки динамической подгрузки .js--lazyContent и загружает в них контент для отображения
 */
(function(w, d, $){
	const selector = '.lazy-html';

	var loaded = true;
	var query = [];

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


	var lazyLoadHtml = function(elem){
		// Завершим работу, если предыдущий элемент еще на загружен
		if(loaded === false){
			return;
		}


		// Достанем элемент из очереди, если он не был задан явно, как входной параметр, в случае динамической загрузки
		// страниц при пагинации
		if(typeof elem === 'undefined'){
			elem = query.shift();
		}


		// Завершим работу, если в очереди ПУСТО
		if(typeof elem === 'undefined'){
			return;
		}
		loaded = false;


		// Получим элемент
		var $elem = $(elem);

		// Наличие начального класса инициализации
		if(!$elem.hasClass('lazy-html--init')){
			loaded = true;
			return;
		}

		$elem.addClass('lazy-html--progress');

		// Определим какой HTML-шаблон хотим подгрузить и параметры, которые хотим в него передать
		var templatePath = $elem.data('path');
		var params = $elem.data('params');

		if(typeof params === 'undefined'){
			params = '';
		}

		if(params === ''){
			params = {};
		}

		var uriParams = window.location.search;
		if($elem.data('page')){
			// Замена номера текущей страницы для пагинации
			var p = parseInt($elem.data('page'));
			uriParams = updateQueryStringParameter(uriParams, 'p', p);
		}

		// Определим язык
		var langPref = '';
		var langs = window.location.pathname.match(/^\/(de|en|es|fr|it|nl|pl|pt|sv|tr)\//);
		if(langs !== null){
			if(langs.length > 1){
				langPref = '/' + langs[1];
			}
		}


		/** Получим HTML-контент */
		var request = $.ajax({
			url: langPref + '/ajax/html/' + templatePath + '/' + uriParams,
			method: 'GET',
			data: params,
			dataType: 'html'
		});

		request.done(function(html) {
			if($elem.hasClass('lazy-html--modereplace')){
				// Вставим внутрь блока иницииатора, полученный html с ЗАМЕНОЙ
				$elem.html(html);
			}
			else {
				// Вставим внутрь блока иницииатора, полученный html
				$elem.append(html);
			}

			// HTML-загружен, сообщим об этом всему документу, возможно найдется какой-то JS, который должен
			// обработать это событие и совершить какое-то действие с контентом вновь загруженного блока
			d.dispatchEvent(new CustomEvent('ajax-html-loaded', {
				detail: { elem: elem }
			}));

			// Покажем ново-подгруженный HTML
			$elem.addClass('lazy-html--loaded');
			setTimeout(function(){
				$elem.removeClass('lazy-html--progress');
				$elem.removeClass('lazy-html--loaded');
				$elem.removeClass('lazy-html--init');

				// Попробуем подгрузить динамический контент, нового динамического блока
				loaded = true;
				lazyLoadHtml($elem.find('.lazy-html').get());


				// Попробуем достать и показать следующий элемент из очереди
				loaded = true;
				lazyLoadHtml();
			}, 600);
		});

		request.fail(function(jqXHR, textStatus) {
			// Ничего не получили, тогда удалим блок инициировавший запрос
			$elem.remove();

			// Попробуем достать и показать следующий элемент из очереди
			loaded = true;
			lazyLoadHtml();
		});
	};


	// Смотри больше параметров здесь https://github.com/verlok/lazyload
	new LazyLoad({
		container: document,
		elements_selector: selector,
		threshold: 100, // default 300
		callback_enter: function(elem){

			// Добавим элемент в очередь загрузки (все блоки на странице будем подгружать по очереди,
			// чтобы не "забивать" канал
			query.push(elem);

			// Вызовем функционал загрузки HTML (он будет сам решать какой элемент загружать по очереди)
			lazyLoadHtml();

			return false;
		}
	});


	window.cwrk = window.cwrk || {};
	window.cwrk.lazyLoadHtml = lazyLoadHtml;

})(window, document, $ || JQuery);
