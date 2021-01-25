
console.log('App.js OK !')

$(window).scroll(function(){
	$('.navbar-default').toggleClass('scrolled', $(this).scrollTop() > 10);
});