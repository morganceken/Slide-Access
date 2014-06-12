$(document).ready(function(){	
		  
	(function($) {
	
		$.fn.slideaccess = function(options) {
		
			/* Variables for CSS ID's and classes */	
			var sAcc			=	$("#slideaccess")
			var sAccContent		=	$(".slideaccess-content")			
			var sAccCtrls		=	$('#slideaccess-ctrls')
			var sAccNextBtn		=	$('#slideaccess-next-btn')	
			var sAccPrevBtn		=	$('#slideaccess-previous-btn')			
			var sAccPlayBtn		=	$('#slideaccess-play-btn')
			var sAccPauseBtn	=	$('#slideaccess-pause-btn')	
			var sAccCounter		=	$("#slideaccess-counter")
			var sAccCounterCur	=	$("#slideaccess-counter-current")
			var sAccCounterTot	=	$("#slideaccess-counter-total")			
			var sAccImg			=	$("#slideaccess img")			
			var sAccTextArea	=	$(".slideaccess-textarea")
			var sAccTextAreaH	=	$(".slideaccess-header")			
			var sAccTextAreaP	=	$(".slideaccess-textarea p")
			var sAccTextAreaA	=	$(".slideaccess-textarea a")
			
			var options = $.extend({}, $.fn.slideaccess.defaults, options);
			var slidesTotal =  sAccContent.length;	
			var slideCurrent = randomSlide() - 1;	
			console.log(randomSlide())			
			
			/* Initiates the slideaccess */	
			var slideaccessInit = function() { 					
				cssInit()
				ctrlsInit()
				checkSlidesTotal()
				bugFixes()
				maxWidth768()
				noJs()
			};
			
			/* Initiate Ctrl-buttons  */	
			var ctrlsInit = function() {		
				sAccPlayBtn.click(function(){play()});
				sAccPauseBtn.click(function(){pause()});	
				
				sAcc.mouseover(function() {
					sAccPauseBtn.stop(true).animate({opacity: 0.6}, 400);
					sAccPlayBtn.stop(true).animate({opacity: 0.6}, 400);								
				});
				  
				sAcc.mouseout(function() {
					sAccPauseBtn.stop(true).animate({opacity: 0.0}, 300);
					sAccPlayBtn.stop(true).animate({opacity: 0.0}, 300);									
				});	
				
			};			
			
			/* Next slide function for Next-button. Pauses slideaccess */			
			var cssInit = function() { 
				sAccCounterCur.text(options.slideaccess_start_slide)
				sAccCounterTot.text(slidesTotal)
				sAccContent.eq(slideCurrent).css("z-index", 1);
				sAcc.css({"max-width":options.slideaccess_width+"px",  "font-family":options.slideaccess_font_family})
				sAccTextArea.css({"background-color":"rgba("+rgb2hex(options.slideaccess_textarea_bg)+","+options.slideaccess_textarea_opacity})	
				sAccTextArea.css({"padding": options.slideaccess_textarea_padding})	
				sAccTextArea.css({"height": sAccImg.height() - options.slideaccess_textarea_padding * 2})	
				sAccTextAreaH.css({"color":options.slideaccess_font_color, "font-size":options.slideaccess_header_size+"px"})
				sAccTextAreaP.css({"color":options.slideaccess_font_color, "font-size":options.slideaccess_font_size+"px"})
				sAccTextAreaA.css({"color":options.slideaccess_a_color, "font-size":options.slideaccess_font_size+"px"})									
		        sAccImg.each(function(){  
					$(this).css("max-height", options.slideaccess_height);
					$(this).css("max-width", options.slideaccess_img_width);
				}); 				
				sAcc.css("height", getLowestImg());
				sAccCtrls.css('width', sAcc.width() - sAccTextArea.outerWidth());
			
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
			
				// Scale up
				if (newDimensions.width > previousDimensions.width) {
				    
					var maxHeight = options.slideaccess_height;    // Max height for the image
					
					var highestImage = 999999999999999999;
					sAccImg.each(function(){ 
						$(this).css("max-height", "");	
				        if ($(this).height() < highestImage){  
				        highestImage = $(this).height();  
						}
					});
					
					sAccImg.each(function(){ 
						$(this).css("max-height", getLowestImg());			
					});  		
					
					if(sAccContent.height() == maxHeight){
						sAccImg.css("width", "100%");
						sAccImg.css("height", "");
						sAccImg.css("max-height", maxHeight);	
					}
					
					else {
					
					 if (newDimensions.width < options.slideaccess_width) {
						
						sAcc.css("height", sAccImg.height());
						sAccContent.css("height", sAccImg.height());				
						sAccTextArea.css({"height": sAccImg.height() - options.slideaccess_textarea_padding * 2})
						}
					}
					sAccCtrls.css('width', sAcc.width() - sAccTextArea.outerWidth());
					
					if(sAcc.width() == options.slideaccess_width){
						sAcc.css("height", options.slideaccess_height)
						sAccContent.css("height", options.slideaccess_height)
					};
				
				} 
				
				// Scale down
				else if (newDimensions.width < options.slideaccess_width) {
				
		            sAccContent.each(function() {
						var maxWidth = options.slideaccess_width; // Max width for the image
						var maxHeight = options.slideaccess_height;    // Max height for the image
						var ratio = 0;  // Used for aspect ratio
						var width = sAccImg.width();    // Current image width
						var height = sAccImg.height();  // Current image height
				 
				 
						// Check if the current width is larger than the max
						if(width > maxWidth){
							ratio = maxWidth / width;   // get ratio for scaling image
							sAccImg.css("width", maxWidth); // Set new width
							sAccImg.css("height", height * ratio);  // Scale height based on ratio
							height = height * ratio;    // Reset height to match scaled image
							width = width * ratio;    // Reset width to match scaled image
						}
				 
						// Check if current height is larger than max
						if(height > maxHeight){
							ratio = maxHeight / height; // get ratio for scaling image
							sAccImg.css("height", maxHeight);   // Set new height
							sAccImg.css("width", width * ratio);    // Scale width based on ratio
							width = width * ratio;    // Reset width to match scaled image
						}
						
						if(sAccContent.height() == maxHeight){
							sAccImg.css("width", "100%");
							sAccImg.css("height", "");
						}	
											
						sAccImg.each(function(){ 
							$(this).css("max-height", getLowestImg());			
						});  			
													
						sAcc.css("height", sAccImg.height());		
						sAccContent.css("height", sAccImg.height());
						sAccCtrls.css('width', sAcc.width() - sAccTextArea.outerWidth());
						sAccTextArea.css({"height": sAccImg.height() - options.slideaccess_textarea_padding * 2})
					
					});	
				
		        }

		        // Store the new dimensions
	        	previousDimensions = newDimensions;
				
	        	maxWidth768()
	        });
			
			/* Start slideaccess function */				
			var play = function() { 
				durationInit = setInterval(function() {forward();}, options.slideaccess_duration);
				sAccPlayBtn.addClass('hidden');
				sAccPauseBtn.removeClass('hidden');							
			};
			
			/* Get lowest image height function */
			function getLowestImg() {
				var ImgHeight = 999999999999999999;
				sAccImg.each(function(){ 
	                if ($(this).height() < ImgHeight){  
	                ImgHeight = $(this).height();  
					}
				});	
				return ImgHeight;
			}
			
			/* Get height image height function */
			function getHighestImg() {
				var ImgHeight = 0;
				sAccImg.each(function(){ 
	                if ($(this).height() > ImgHeight){  
	                ImgHeight = $(this).height();  
					}
				});	
				return ImgHeight;
			}
			
			/* Get heighest text area height function */
			function getHighestTextArea() {
				var textAreaHeight = 0;
				sAccTextArea.each(function(){ 
	                if ($(this).height() > textAreaHeight){  
	                textAreaHeight = $(this).outerHeight();  
					}
				});	
				return textAreaHeight;
			}
			
			/* Check total slides function. If there is only one then it hides controls, counter and stops fading  */				
			var checkSlidesTotal = function() {
				if (slidesTotal == 1) {
					sAccCtrls.addClass('hidden');	
					sAccCounter.addClass('hidden');
					sAccContent
						.eq(slideCurrent)
						.css('opacity', 100)					
				}
				else {
					sAccNextBtn.click(function() {
							next();
						});	
					
					sAccPrevBtn.click(function() {
							previous();
						});
						
					sAccContent.each(function() {
							$(this)
							.css('opacity', 0)
							.click(function() {
								next();
							});
						})	
						
					sAccContent.eq(slideCurrent).css('opacity', 100)						
						
					play();	
				};	
			};	
			
			/* Pause slide function for Pause-button. */	
			var pause = function() {
				clearInterval(durationInit)
				sAccPauseBtn.addClass('hidden');				
				sAccPlayBtn.removeClass('hidden');
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
				sAccCounterCur.text(slideCurrent)
			};	
			
			/* Slide counter function */
			function randomSlide() {
				rSlide = Math.floor(Math.random() * slidesTotal)				
				return rSlide
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
				if(sAcc.height() == 0){
					sAcc.css("height", "340px")
					
					var newHeight = options.slideaccess_height / options.slideaccess_width * sAcc.width()
					sAcc.css("height", newHeight)
				};	
									
			};	
			
			function noJs() {
				
				sAccContent.css("position", "absolute").css("height", "100%").css("display", "block")
				sAccImg.css("position", "absolute")
				sAccImg.css("position", "absolute")
				sAccCtrls.css("display", "block")
				sAccCounter.css("display", "block")

				
									
			};			
			
			/* CSS for tablets and smartphones */
			function maxWidth768() { 
			
				if ($( window ).width() < 769) {
					
					var stdSlideAccHeight = sAcc.height();
					
					sAccCtrls.css("top", sAcc.height() / 2)
					sAccTextArea.css({"top":sAcc.height()})
			    	sAcc.css("height", sAcc.height() + getHighestTextArea())
			    	sAccContent.css("height", sAcc.height())
			    	sAccTextArea.css({"background-color":options.slideaccess_textarea_bg})	
			    	sAcc.css("height", getHighestTextArea() + stdSlideAccHeight)
			    	sAccContent.css("height", getHighestTextArea() + stdSlideAccHeight)
			    	console.log(getHighestTextArea() + stdSlideAccHeight)	
			    }
			    else {
			    	sAccCtrls.css("top", "")
					sAccCtrls.css("margin-top", "")	
					sAccTextArea.css({"top": ""})
					sAccTextArea.css({"background-color":"rgba("+rgb2hex(options.slideaccess_textarea_bg)+","+options.slideaccess_textarea_opacity})
			    };
			}	
			var c = slideCurrent+1
			
			/* Previous slide function */
			var backward = function () {

				slideCurrent = (slideCurrent-1) % slidesTotal;
				sAccContent.eq(slideCurrent).css('opacity', 100)				 
				sAccContent.eq((slideCurrent+1) % slidesTotal)
				.fadeOut(options.slideaccess_fade_speed, function() {
					$(this).css('opacity', 0).css('display','block').css('z-index', 0)
					sAccContent.eq(slideCurrent).css('z-index', 1)
				});
				
				c--
				if (c == 0) {

					c = slidesTotal;
				}
				slideCounter(c)
			};	
				
			/* Next slide function */
			var forward = function () {
			
				slideCurrent = (slideCurrent+1) % slidesTotal;
				sAccContent.eq(slideCurrent).css('opacity', 100)				 
				sAccContent.eq((slideCurrent-1) % slidesTotal)
				.fadeOut(options.slideaccess_fade_speed, function() {
					$(this).css('opacity', 0).css('display','block').css('z-index', 0)
					sAccContent.eq(slideCurrent).css('z-index', 1)
				});
				
				c++
				if (c > slidesTotal) {

					c = 1;
				}			
				slideCounter(c)
			
			};	
			
			// Initiate the slideaccess
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
		'slideaccess_textarea_bg':		'#000000',	// Slideshow background color.
		'slideaccess_textarea_opacity':	0.8,		// Slideshow opacity for text area.
		'slideaccess_textarea_padding':	15,			// Slideshow padding for the textarea.
		'slideaccess_font_family': 		'arial',	// Slideshow font type.
		'slideaccess_font_color': 		'#fff',		// Slideshow font size (px).
		'slideaccess_font_size': 		16,			// Slideshow <p> size (px).		
		'slideaccess_header_size': 		28,			// Slideshow header size (px).
		'slideaccess_a_color': 			'#0080dd',		// Slideshow <a> color.
	});
   
});