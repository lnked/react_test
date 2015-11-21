;(function ($) {
	"use strict";

	$.app = $.app = $.app || {};

	$.app.scroll = {

		init: function(element, watch, destroy_width)
		{
			$(element).jScrollPane({
				horizontalGutter: 0,
				verticalGutter: 0,
        		mouseWheelSpeed: 50
			});

			if (watch)
			{
				var api = $(element).data('jsp');
				var throttleTimeout;

				$(window).on('resize', function(){
					if (!throttleTimeout) {
						throttleTimeout = setTimeout(function() {
							
							if (typeof destroy_width !== 'undefined' && destroy_width >= $(window).width())
							{
								api.destroy();
							}
							else
							{
								api.reinitialise();
							}

							throttleTimeout = null;
						}, 50);
					}
				});
			}
		}

	};

})(jQuery);