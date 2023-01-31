(function(w, $){

	if(typeof w.cwrk === 'undefined'){
		return false;
	}

	if(typeof w.cwrk.recaptcha === 'undefined'){
		return false;
	}

	if(typeof w.cwrk.recaptcha.key === 'undefined' || typeof window.cwrk.recaptcha.url === 'undefined'){
		return false;
	}




	var wasInited = false;

	// Только формы обратной связи
	$('.webform').mouseover('touchstart click mouseenter mouseout', function(){

		if(wasInited === true){
			return false;
		}


		$('<script src="' + window.cwrk.recaptcha.url + '?onload=onloadCallback&render=explicit" async defer></script>').appendTo(document.body);
		wasInited = true;
	});



	w.cwrk.recaptcha.widgets = [];
	w.reCaptchedForm = {};

	w.onloadCallback = function(){
		$('.recaptcha-container').each(function(){
			var id = $(this).attr('id');

			w.cwrk.recaptcha.widgets[id] = grecaptcha.render(id, {
				'sitekey' : w.cwrk.recaptcha.key,
				'callback' : onSubmit
				// 'size': 'invisible'
			});

		});
	};

	w.onSubmit = function (token) {
	}
})(window, $ || JQuery);