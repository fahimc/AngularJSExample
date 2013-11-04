(function(){
document.addEventListener('click', function(evt) {
	var target = evt.target.getAttribute("data-target");
	if (target) {
		var el = document.getElementById(target);
		var attr = el.getAttribute('data-state');

		if (attr === 'open') {
			el.setAttribute('data-state', 'close');
			el.classList.add('hidden');
			evt.target.innerHTML = "Show source";
		} else {
			el.setAttribute('data-state', 'open');
			el.classList.remove('hidden');
			evt.target.innerHTML = "Hide source";
		}
		evt.stopPropagation();
		evt.preventDefault();
	} else {
		console.log("fuck");
	}
}, false);
})();