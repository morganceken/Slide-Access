$(document).ready(function(){	
		  
	(function($) {
	
		$.fn.slideaccess = function(options) {
		
			var options = $.extend({}, $.fn.slideaccess.defaults, options);
			var slidesTotal =  $('#slideaccess .slideaccess-content').length;				
			var slideCurrent = options.slideaccess_start_slide - 1;		
			
			
			/* Initiates the slideaccess */	
			var slideaccessInit = function() { 					
				cssInit()
				ctrlsInit()
				checkSlidesTotal()
				bugFixes()
				maxWidth768()
				maxWidth320()
			};
			
			/* Initiate Ctrl-buttons  */	
			var ctrlsInit = function() {		
				$('#slideaccess-play-btn').click(function(){play()});
				$('#slideaccess-pause-btn').click(function(){pause()});	
				
				$('#slideaccess').mouseover(function() {
					$('#slideaccess-pause-btn').stop(true).animate({opacity: 0.6}, 400);
					$('#slideaccess-play-btn').stop(true).animate({opacity: 0.6}, 400);								
				});
				  
				$('#slideaccess').mouseout(function() {
					$('#slideaccess-pause-btn').stop(true).animate({opacity: 0.0}, 300);
					$('#slideaccess-play-btn').stop(true).animate({opacity: 0.0}, 300);									
				});	
				
			};			
			
			/* Next slide function for Next-button. Pauses slideaccess */			
			var cssInit = function() { 
				$( "#slideaccess-counter-current").text(options.slideaccess_start_slide)
				$( "#slideaccess-counter-total").text(slidesTotal)
				$('#slideaccess .slideaccess-content').eq(slideCurrent).css("z-index", 1);
				$( "#slideaccess" ).css({"max-width":options.slideaccess_width+"px",  "font-family":options.slideaccess_font_family})
				$( "#slideaccess .slideaccess-textarea" ).css({"background-color":"rgba("+rgb2hex(options.slideaccess_background)+","+options.slideaccess_textarea_opacity})	
				$( "#slideaccess .slideaccess-textarea" ).css({"padding": options.slideaccess_textarea_padding})	
				$( "#slideaccess .slideaccess-textarea" ).css({"height": $( "#slideaccess img" ).height() - options.slideaccess_textarea_padding * 2})	
				$( "#slideaccess .slideaccess-textarea .slideaccess-header" ).css({"color":options.slideaccess_font_color, "font-size":options.slideaccess_header_size+"px"})
				$( "#slideaccess .slideaccess-textarea p" ).css({"color":options.slideaccess_font_color, "font-size":options.slideaccess_font_size+"px"})
				$( "#slideaccess .slideaccess-textarea a" ).css({"color":options.slideaccess_a_color, "font-size":options.slideaccess_font_size+"px"})									
		        $('#slideaccess img').each(function(){  
					$(this).css("max-height", options.slideaccess_height);
					$(this).css("max-width", options.slideaccess_img_width);
				}); 				
				$('#slideaccess').css("height", getLowestImg());
				$( "#slideaccess #slideaccess-ctrls" ).css('width', $( "#slideaccess" ).width() - $( "#slideaccess .slideaccess-textarea" ).outerWidth());
			
			};			

			
			var $window = $(window),
			previousDimensions = {
			    width: $window.width(),
			    height: $window.height()
			};
			
			
			/* Scaling function. Scales slideshow when resizing  */		

			$window.resize(function(e) {
				var newDimensions = {
				    width: $window.width(),
				    height: $window.height()
				};
			
			
				if (newDimensions.width > previousDimensions.width) {
				    // scaling up
					var maxHeight = options.slideaccess_height;    // Max height for the image
					
					var highestImage = 999999999999999999;
					$('#slideaccess img').each(function(){ 
						$(this).css("max-height", "");	
				        if ($(this).height() < highestImage){  
				        highestImage = $(this).height();  
						}
					});
					
					$('#slideaccess img').each(function(){ 
						$(this).css("max-height", getLowestImg());			
					});  		
					
					if($( "#slideaccess .slideaccess-content" ).height() == maxHeight){
						$( "#slideaccess img" ).css("width", "100%");
						$( "#slideaccess img" ).css("height", "");
						$( "#slideaccess img" ).css("max-height", maxHeight);	
					}
					
					else {
					
					 if (newDimensions.width < options.slideaccess_width) {
						
						$('#slideaccess').css("height", $("#slideaccess img" ).height());
						$('.slideaccess-content').css("height", $("#slideaccess img" ).height());				
						$( "#slideaccess .slideaccess-textarea" ).css({"height": $( "#slideaccess img" ).height() - options.slideaccess_textarea_padding * 2})
						}
					}
					$( "#slideaccess #slideaccess-ctrls" ).css('width', $( "#slideaccess" ).width() - $( "#slideaccess .slideaccess-textarea" ).outerWidth());
					
					if($( "#slideaccess" ).width() == options.slideaccess_width){
						$( "#slideaccess" ).css("height", options.slideaccess_height)
						$( "#slideaccess .slideaccess-content" ).css("height", options.slideaccess_height)
					};
				
				} 
			
				else if (newDimensions.width < options.slideaccess_width) {
				
		            $('.slideaccess-content').each(function() {
					var maxWidth = options.slideaccess_width; // Max width for the image
					var maxHeight = options.slideaccess_height;    // Max height for the image
					var ratio = 0;  // Used for aspect ratio
					var width = $( "#slideaccess img" ).width();    // Current image width
					var height = $( "#slideaccess img" ).height();  // Current image height
			 
			 
					// Check if the current width is larger than the max
					if(width > maxWidth){
						ratio = maxWidth / width;   // get ratio for scaling image
						$( "#slideaccess img" ).css("width", maxWidth); // Set new width
						$( "#slideaccess img" ).css("height", height * ratio);  // Scale height based on ratio
						height = height * ratio;    // Reset height to match scaled image
						width = width * ratio;    // Reset width to match scaled image
					}
			 
					// Check if current height is larger than max
					if(height > maxHeight){
						ratio = maxHeight / height; // get ratio for scaling image
						$( "#slideaccess img" ).css("height", maxHeight);   // Set new height
						$( "#slideaccess img" ).css("width", width * ratio);    // Scale width based on ratio
						width = width * ratio;    // Reset width to match scaled image
					}
					
					if($( "#slideaccess .slideaccess-content" ).height() == maxHeight){
						$( "#slideaccess img" ).css("width", "100%");
						$( "#slideaccess img" ).css("height", "");
					}	
										
					$('#slideaccess img').each(function(){ 
						$(this).css("max-height", getLowestImg());			
					});  			
						
					
					$('#slideaccess').css("height", $("#slideaccess img" ).height());		
					$('.slideaccess-content').css("height", $("#slideaccess img" ).height());
					$( "#slideaccess #slideaccess-ctrls" ).css('width', $( "#slideaccess" ).width() - $( "#slideaccess .slideaccess-textarea" ).outerWidth());
					$( "#slideaccess .slideaccess-textarea" ).css({"height": $( "#slideaccess img" ).height() - options.slideaccess_textarea_padding * 2})
					
					});	
				
		        }

		        // Store the new dimensions
	        	previousDimensions = newDimensions;
	        	
	        	maxWidth768()
	        });
			
			/* Start slideaccess function */				
			var play = function() { 
				durationInit = setInterval(function() {forward();}, options.slideaccess_duration);
				$( "#slideaccess-play-btn").addClass('hidden');
				$( "#slideaccess-pause-btn").removeClass('hidden');							
			};
			
			
			function getLowestImg() {
				var ImgHeight = 999999999999999999;
				$('#slideaccess img').each(function(){ 
	                if ($(this).height() < ImgHeight){  
	                ImgHeight = $(this).height();  
					}
				});	
				return ImgHeight;
			}
			
			function getHighestImg() {
				var ImgHeight = 0;
				$('#slideaccess img').each(function(){ 
	                if ($(this).height() > ImgHeight){  
	                ImgHeight = $(this).height();  
					}
				});	
				return ImgHeight;
			}
			
			function getHighestTextArea() {
				var textAreaHeight = 0;
				$('#slideaccess .slideaccess-textarea').each(function(){ 
	                if ($(this).height() > textAreaHeight){  
	                textAreaHeight = $(this).outerHeight();  
					}
				});	
				return textAreaHeight;
			}
			
			/* Check total slides function. If there is only one then it hides controls, counter and stops fading  */				
			var checkSlidesTotal = function() {
				if (slidesTotal == 1) {
					$( "#slideaccess-ctrls").addClass('hidden');	
					$( "#slideaccess-counter").addClass('hidden');
					$( "#slideaccess .slideaccess-content" )
						.eq(slideCurrent)
						.css('opacity', 100)					
				}
				else {
					$( "#slideaccess-next-btn" )
						.click(function() {
							next();
						});	
					
					$( "#slideaccess-previous-btn" )
						.click(function() {
							previous();
						});
						
					$( "#slideaccess .slideaccess-content" )
						.each(function() {
							$(this)
							.css('opacity', 0)
							.click(function() {
								next();
							});
						})	
						
					$( "#slideaccess .slideaccess-content" )
						.eq(slideCurrent)
						.css('opacity', 100)						
						
					play();	
				};	
			};	
			
			/* Pause slide function for Pause-button. */	
			var pause = function() {
				clearInterval(durationInit)
				$( "#slideaccess-pause-btn").addClass('hidden');				
				$( "#slideaccess-play-btn").removeClass('hidden');
			};
			
			/* Previous slide function for Previous-button. Pauses slideaccess */			
			var previous = function() {
				pause()
				setTimeout(function(){backward()},300)		
			};	
			
			/* Next slide function for Next-button. Pauses slideaccess */			
			var next = function() {
				pause()
				setTimeout(function(){forward()},300)	
			};			
			
			/* Slide counter function */
			var slideCounter = function(slideCurrent) {
				$( "#slideaccess-counter-current" ).text(slideCurrent)
			};	
			
		
			//Function to convert hex format to a rgb color
			function rgb2hex(rgb){
				var s = rgb
				var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
				var matches = patt.exec(s);
				var rgb = parseInt(matches[1], 16)+","+parseInt(matches[2], 16)+","+parseInt(matches[3], 16);
				
				return rgb
			}	
			
			/* Bug fix function */
			function bugFixes() {
			
				// Fixing height bug when spam refreshing browser
				if($( "#slideaccess" ).height() == 0){
					$( "#slideaccess" ).css("height", "340px")
					
					var newHeight = options.slideaccess_height / options.slideaccess_width * $( "#slideaccess" ).width()
					$( "#slideaccess" ).css("height", newHeight)
					
				};	
									
			};	
			
			function maxWidth768() { 
			
				if ($( window ).width() < 769) {
					
					var stdSlideAccHeight = $('#slideaccess').height();
					
					$('#slideaccess #slideaccess-ctrls').css("top", $('#slideaccess').height() / 2)
					$( "#slideaccess .slideaccess-textarea" ).css({"top":$( "#slideaccess" ).height()})
			    	$('#slideaccess').css("height", $('#slideaccess').height() + getHighestTextArea())
			    	$('#slideaccess .slideaccess-content').css("height", $('#slideaccess').height())
			    	$( "#slideaccess .slideaccess-textarea" ).css({"background-color":options.slideaccess_background})	
			    	$('#slideaccess').css("height", getHighestTextArea() + stdSlideAccHeight)
			    	$('#slideaccess .slideaccess-content').css("height", getHighestTextArea() + stdSlideAccHeight)
			    	console.log(getHighestTextArea() + stdSlideAccHeight)	
			    }
			    else {
					$('#slideaccess #slideaccess-ctrls').css("margin-top", "")	
					$( "#slideaccess .slideaccess-textarea" ).css({"top": ""})
					$( "#slideaccess .slideaccess-textarea" ).css({"background-color":"rgba("+rgb2hex(options.slideaccess_background)+","+options.slideaccess_textarea_opacity})
			    };
			}	
			
			function maxWidth320() { 
			
			}	
			
			/* Previous slide function */
			var backward = function () {
				$( "#slideaccess #slideaccess-ctrls" ).css('width', $( "#slideaccess .slideaccess-img-container" ).eq(slideCurrent).width())
				var a = $( "#slideaccess .slideaccess-content" )
				
				 if(slideCurrent == 0){
				 	slideCurrent = slidesTotal;	 
				 }
				 				
				 if(slideCurrent == slidesTotal){
				 
				 	a.eq(slidesTotal - 1).css('z-index', -1).css('opacity', 100)
					a.eq(0)
					.fadeOut(options.slideaccess_fade_speed, function() {
				    	$(this)
				    	.css('opacity', 0)
				    	.css('display','block')
						$( "#slideaccess .slideaccess-content" ).each(function() {
							$(this)
							.css('z-index', 0)
						});	
						a.eq(slideCurrent).css('z-index', 1).css('opacity', 100)						
					 });
				 }
				 
				 else {			
				 	a.eq(slidesTotal - 1).css('z-index', 0)
					a.eq(slideCurrent - 1).css('opacity', 100)
					a.eq(slideCurrent)
					.fadeOut(options.slideaccess_fade_speed, function() {
				    	$(this)
				    	.css('opacity', 0)
				    	.css('display','block')
						$( "#slideaccess .slideaccess-content" ).each(function() {
							$(this)
							.css('z-index', 0)
						});			
						a.eq(slideCurrent).css('z-index', 1).css('opacity', 100)						
					 });
				}
				 slideCurrent--
				 slideCounter(slideCurrent+1)
			};	
				
			/* Next slide function */
			var forward = function () {

				 slideCurrent++
				 
				 if(slideCurrent == slidesTotal){
				 	slideCurrent = 0;	 
				 }
			
				var a = $( "#slideaccess .slideaccess-content" )	
				
				 if(slideCurrent == 0) {
				 
				 	a.eq(slideCurrent).css('z-index', -1).css('opacity', 100)
					a.eq(slidesTotal - 1)
					.fadeOut(options.slideaccess_fade_speed, function() {
				    	$(this)
				    	.css('opacity', 0)
				    	.css('display','block')
						$( "#slideaccess .slideaccess-content" ).each(function() {
							$(this)
							.css('z-index', 0)
						});	
						a.eq(slideCurrent).css('z-index', 1).css('opacity', 100)
					 });
					 
				 }				 
				else {		
					a.eq(slideCurrent).css('opacity', 100).css('z-index', -1)
					a.eq(slideCurrent - 1)
					.fadeOut(options.slideaccess_fade_speed, function() {
				    	$(this)
				    	.css('opacity', 0)
				    	.css('display','block')
						$( "#slideaccess .slideaccess-content" ).each(function() {
							$(this)
							.css('z-index', 0)
						});					
						a.eq(slideCurrent).css('z-index', 1).css('opacity', 100)
				    });
						

				}
							
				$( "#slideaccess #slideaccess-ctrls" ).css('width', $( "#slideaccess .slideaccess-img-container" ).eq(slideCurrent).width())
				


				slideCounter(slideCurrent+1)

			};	
			
			/* Initiate the slideaccess */
			slideaccessInit()
		};	
	}) (jQuery);
	
	/* Options for slideaccess */		
	$.fn.slideaccess({
		'slideaccess_duration':			5000,		// Slideshow speed.
		'slideaccess_width':			940, 		// Slideshow width (px).
		'slideaccess_height':			340,		// Slideshow height (px).
		'slideaccess_img_width':		940, 		// Slideshow width (px).
		'slideaccess_fade_speed': 		300,		// Slideshow fade speed (px).
		'slideaccess_start_slide': 		1,			// Slideshow start node. 1 is default.
		'slideaccess_background':		'#000000',	// Slideshow background color.
		'slideaccess_textarea_opacity':	0.8,	// Slideshow background color.
		'slideaccess_textarea_padding':	15,			// Slideshow padding for the textarea.
		'slideaccess_font_family': 		'arial',	// Slideshow font type.
		'slideaccess_font_color': 		'#fff',		// Slideshow font size (px).
		'slideaccess_font_size': 		16,			// Slideshow <p> size (px).		
		'slideaccess_header_size': 		28,			// Slideshow header size (px).
		'slideaccess_a_color': 			'#0080dd',		// Slideshow <a> color.
	});
   
});