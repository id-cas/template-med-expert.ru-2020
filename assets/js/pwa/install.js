(function(){
	'use strict';

	// Установим serviceWorker (можно пустышку), но ОБЯЗАТЕЛЬНО
	// ОБЯЗАТЕЛЬНО в корень + https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Examples
	if('serviceWorker' in navigator) {
		// Если ранее был зарегистрирован вокер, тогда разрегистриуем и зарегистриуем новый
		navigator.serviceWorker.getRegistrations().then(function (registrations) {
			for (const registration of registrations) {
				console.log('Service Worker Unregistered');


				registration.unregister().then(function(){

					// Регистрируем новый
					if(window.location.pathname == '/'){
						navigator.serviceWorker
							.register('/sw.js', {scope: './'})
							// .register('/install/sw.js')
							.then(function() { console.log('Service Worker Registered'); });
					}

				});
			}
		});


		// Если первый раз и никакого вокера у пользователя нет в помине
		navigator.serviceWorker.getRegistrations().then(function (registrations) {
			if(registrations.length === 0){

				// Регистрируем новый
				if(window.location.pathname == '/'){
					navigator.serviceWorker
						.register('/sw.js', {scope: './'})
						.then(function() { console.log('Service Worker Registered'); });
				}

			}
		});



//		navigator.serviceWorker
//			//.register('/sw.js', {scope: '/'})
//			.register('/sw.js')
//			.then(function() { console.log('Service Worker Registered'); });
	}


	let deferredPrompt;
	const addBtn = document.querySelector('.js--onclick-callInstall');
	const alreadyInstalledBlock = document.querySelector('.js--alreadyInstalledBlock');

	if(!(addBtn && alreadyInstalledBlock)){
		return;
	}


	alreadyInstalledBlock.classList.remove('hidden');
	addBtn.disabled = true;

	window.addEventListener('beforeinstallprompt', function(e) {
		console.log('>>>>>>>>> beforeinstallprompt');

		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault();

		// Stash the event so it can be triggered later.
		deferredPrompt = e;

		// Update UI to notify the user they can add to home screen

		alreadyInstalledBlock.classList.add('hidden');
		addBtn.disabled = false;


		addBtn.addEventListener('click', function(d) {
			// Вызвать событие для метрики
			if(typeof ym !== 'undefined'){
				ym(28925455, 'reachGoal', 'btnInstallPressed');
			}

			// hide our user interface that shows our A2HS button
			addBtn.disabled = true;

			// Show the prompt
			deferredPrompt.prompt();

			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice.then(function(choiceResult) {
				if (choiceResult.outcome === 'accepted') {
					console.log('User accepted the A2HS prompt');
				}
				else {
					console.log('User dismissed the A2HS prompt');
				}
				deferredPrompt = null;
			});
		});
	});

})();