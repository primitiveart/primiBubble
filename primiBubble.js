(function($){

	$.fn.extend({ 

		primiBubble: function(options) {

			var defaults = {
				bounce: false,  
				message : 'This is a helpful primiBubble',
				position : 'auto', /* OR object: { left: '0px', top: '0px'} */
				arrow : 'side left', /* 'side/top/bottom left/right' */
				clickToClose : false, /* If true shows 'x' button */
				time : 10000 /* If empty string then primiBubble closes only on click */
			}
			
			var options =  $.extend(defaults, options);
			
			return this.each(function() {
				var o = options;
				
				var obj = $(this);
				
				var htmlMarg = {top: 'unchanged', left: 'unchanged'};
				
				/* Generate object tag */
				var elTag = '';
				if (obj instanceof Object) {
					if (typeof obj.attr('id') !== 'undefined') {
						elTag = '_' + obj.attr('id');
					} else if (typeof obj.attr('class') !== 'undefined') {
						var classAtr = obj.attr('class').split(' ')[0];
						elTag = '_' + classAtr;
					}
				}
				
				/* Generate bubble object */
				var bubbleId = Math.ceil(Math.random() * 100) + elTag;
				$('body').prepend('<div id="' + bubbleId + '" class="help_hint" style="width:auto;height:auto;">' + '<div class="help_arrow ' + o.arrow + '"></div>' + '<p style="margin-left: 8px; padding-right: 10px;">' + o.message + '</p>' + '</div>');
				var bubbleObj = $('#' + bubbleId + '');
				if (o.clickToClose == true) {
					bubbleObj.prepend('<img class="help_close" src="img/close_bubble.png">');
				}
				
				/* Calculate bubble position */
				if (!(o.position instanceof Object) && (o.position === 'auto') && (obj instanceof Object)) {
					var offset = obj.offset();
					o.position = {left: 0, top: 0};
					if(o.arrow.indexOf('side') > -1){
						if(o.arrow.indexOf('left') > -1){
							o.position.left = offset.left + obj.width() + 25;
						}
						else if(o.arrow.indexOf('right') > -1){
							o.position.left = offset.left - bubbleObj.width() - 25;
						}
						o.position.top = offset.top - 30;
					}
					else if(o.arrow.indexOf('top') > -1){
						if(o.arrow.indexOf('left') > -1){
							o.position.left = offset.left - 10;
						}
						else if(o.arrow.indexOf('right') > -1){
							o.position.left = offset.left - bubbleObj.width() + obj.width();
						}
						o.position.top = offset.top + 25;
					}
					else if(o.arrow.indexOf('bottom') > -1){
						if(o.arrow.indexOf('left') > -1){
							o.position.left = offset.left - 10;
						}
						else if(o.arrow.indexOf('right') > -1){
							o.position.left = offset.left - bubbleObj.width() + obj.width();
						}
						o.position.top = offset.top - obj.height() - bubbleObj.height() - 25;
					}
					
					if(o.position.left + bubbleObj.width() > $(window).width()){
						htmlMarg.left = $('html').css('margin-left');
						$('html').animate(
							{
								marginLeft: - Math.abs(bubbleObj.width() + 25)
							}
						);
					}
							
					if(o.position.left < 0){
						htmlMarg.left = $('html').css('margin-left');
						$('html').animate(
							{
								marginLeft: Math.abs(o.position.left)
							}
						);
					}
							
					if(o.position.top + bubbleObj.height() > $(window).height()){
						htmlMarg.top = $('html').css('margin-top');
						$('html').animate(
							{
								marginTop: - Math.abs(bubbleObj.height() + 25)
							}
						);
					}
						
					if(o.position.top < 0){
						htmlMarg.top = $('html').css('margin-top');
						$('html').animate(
							{
								marginTop: Math.abs(o.position.top)
							}
						);
					}
				}
				
				/* Set bubble position */
				bubbleObj.css(
					{
						marginLeft: o.position.left,
						marginTop: o.position.top
					}
				);
				
				$('.help_hint').fadeIn('normal');
				
				/* Let the primitive magic happen
				Start object bouncing */
				if ((obj !== 'none') && (o.bounce == true)) {
					obj.effect('bounce', 500);
					var bounceTimer = setInterval(function() {
						obj.effect('bounce', 500);
					}, 10000);
				}
				
				/* If user has entered time then close hint after time */
				if ((o.time !== '') && (isNumber(o.time))) {
					var activeTimer = setTimeout(function() {
						closeHint();
					}, o.time);
				}
				
				/* Close bubble on 'x' */
				bubbleObj.click(function() {
					closeHint();
				});
				
				/* Close bubble on click anywhere on the page */
				if (o.clickToClose == false) {
					setTimeout(function(){
						$(window).click(function() {
							$(window).unbind('click');
							closeHint();
						});
						$(window).keypress(function() {
							$(window).unbind('click');
							closeHint();
						});
					}, 50);
				}
				
				/* Function to manage close */
				function closeHint() {
					bubbleObj.fadeOut('normal', function() {
						if (typeof bounceTimer !== 'undefined') {
							clearInterval(bounceTimer);
						}
						bubbleObj.remove();
					});
					
					if(htmlMarg.top !== 'unchanged'){
						$('html').animate(
							{
								marginTop: htmlMarg.top
							}
						);
					}
					
					if(htmlMarg.left !== 'unchanged'){
						$('html').animate(
							{
								marginLeft: htmlMarg.left
							}
						);
					}
	
				}
				
				/* Function to heck if given value is number */
				function isNumber(value){ 
					return !isNaN(parseFloat(value)) && isFinite(value); 
				} 
				
			});
		}
	});

})(jQuery);