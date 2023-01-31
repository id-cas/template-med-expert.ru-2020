(function(d, w, $){
	$('.js--faq-btn').on('click', function(){
		$(this).parents('.faq-item').toggleClass('open');
	});
})(document, window, $);