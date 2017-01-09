(function ($) {
	
	$.fn.sS = function (options) {
		$.fn.sS.options = $.extend($.fn.sS.options, options);
		$.fn.sS.generalCss(this);
		$.fn.sS[$.fn.sS.options['animation']](this);
		(function slide (container, slideNumber) {
			$(container).css('background-image',"url('"+$.fn.sS.options.path+$.fn.sS.options.images[slideNumber]+"')");
			setTimeout(function () {
				slide(container,(++slideNumber)%$.fn.sS.options.images.length);
			}, $.fn.sS.options.showTime);
		})(this, 1);
	}

	$.fn.sS.options = {
		path: './',
		images: [],
		showTime: 5000,
		bgRepeat: 'no-repeat',
		animation: 'transition'
	}

	$.fn.sS.generalCss = function (container) {
		$(this).css('background-repeat',$.fn.sS.options.bgRepeat);
	}

	$.fn.sS.transition = function (container) {
		$(container).css('transition','background-image 4s');
		$(container).css('-webkit-transition','background-image 4s');
		$(container).css('-moz-transition','background-image 4s');
	}

})(jQuery);