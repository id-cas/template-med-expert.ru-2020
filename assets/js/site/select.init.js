(function(w, d, $){

	var initCustomSelect = function(elem){

		$(elem).find('.select-wrap').each(function() {

			if($(this).hasClass('inited')){
				return false;
			}

			$(this).addClass('inited');

			var selectItems = $(this).find('select option'),
				selectItemsLength = selectItems.length;

			var selectedValue = $(this).find('select option:selected');

			$(this).append('<div class="select-value"><span>'+ (selectedValue.length ? selectedValue.text() : selectItems.eq(0).text()) +'</span><img src="/resources/images/chevron-down.svg" alt="ico"></div>');
			$(this).append('<div class="select-dropdown"><ul></ul></div>');

			for (var i = 0; i < selectItemsLength; i++) {
				if(selectItems.eq(i).attr('hidden') != 'hidden'){
					$(this).find('ul').append('<li>'+ selectItems.eq(i).text() +'</li>');
				}
				else{
					$(this).find('ul').append('<li class="hidden">'+ selectItems.eq(i).text() +'</li>');
				}
			}

		});

	};

	/** События */
	$(d).on('click', '.select-value', function() {
		$(this).toggleClass('active dropdown-active');
		$(this).next().toggleClass('active');
	});

	$(d).on('click', '.select-wrap ul li', function() {
		var mainWrap = $(this).parents('.select-wrap'),
			selectIndex = $(this).index(),
			selectValue = $(this).text();

		mainWrap.find('select option').removeAttr('selected');

		mainWrap.find('select option').eq(selectIndex).attr('selected','true');
		mainWrap.find('select').trigger('change');

		mainWrap.find('.select-value span').html(selectValue);
		mainWrap.find('.select-value').click();
	});


	/** Инициализация */
	initCustomSelect(d);

	// Событие при загрузки HTML-блока, загруженного через AJAX
	d.addEventListener('ajax-html-loaded', function(event) {
		initCustomSelect(event.detail.elem);
	});

})(window, document, $ || JQuery);