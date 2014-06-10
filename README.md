# Slide-Access(ability)

Slide-Access är en supertillgänglig slideshow som är utvecklad och optimerad även för personer med funktionsnedsättning. Slideshowen innehåller tydliga kontroller, utmärkt stöd för skärmläsare och har även support för att lägga till egen text. Inte bara bilder.

Slideshowen använder sig endast av Fade-funktionen vilket är att föredra för personer med kognitiva problem.

Slide-Access är helt enkelt ett utmärkt val för dig som prioriterar webbtillgänglighet!

## Funktioner och egenskaper:
* Utmärkta kontroller med tydliga etiketter
* Fullt responsiv
* Kognitivt anpassad
* Perfekt för personer med skärmläsare
* Anpassningspar
* Möjlighet att lägga in text

## Funktioner och egenskaper:
Här följer några punkter som gör Slide-Access unik i jämförelse med de flesta slideshows på marknaden:

* Play och pause-knapp
* Tillgängliga kontroller
* Bättre för skärmlasare
* Support för text
* Kognitivt annpassad


Följ dessa instruktioner för att installera Slide-Access:

Kopiera och klistra in denna kod i din `<head>` -tag.


~~~
<link rel="stylesheet" type="text/css" href="jsfader/css/jsfader.css">
<script src="jsfader/js/jquery.js"></script>
<script src="jsfader/js/jsfader.js"></script>
~~~
Kopiera och klistra in denna kod i din `<body>` -tag. Varje `<article>` genererar 1 slide.

~~~
<div id="jsfader">

	<!-- Slider Controls -->
	<div id="jsfader-ctrls" aria-hidden="true">
		<a id="jsfader-play-btn" title="Starta bildspelet" href="#null" aria-hidden="true"></a> 
		<a id="jsfader-pause-btn" title="Pausa bildspelet" href="#null" aria-hidden="true"></a> 
		<a id="jsfader-next-btn" title="Nästa nyhet" href="#null" aria-hidden="true"></a> 
		<a id="jsfader-previous-btn" title="Föregående nyhet" href="#null" aria-hidden="true"></a> 
	</div>	
	<!-- END Slider Controls -->
	
	<!-- Slide 1 -->
	<article class="jsfader-content">
		<img src="jsfader/img/bild.jpg" alt="">
		<section class="jsfader-textarea">
			<h1 class="Slide-Access-header">Rubrik</h1>
			<p>Text</p>
			<a href="">Länk</a>
		</section>	
	</article>				
	
	<!-- END Slide 1 -->
	
	<!-- Slider counter -->
	<div id="jsfader-counter" aria-hidden="true">
		<span id="jsfader-counter-current"></span> 
		/ 
		<span id="jsfader-counter-total"></span>
	</div>
	<!-- END Slider counter -->	
		
</div>
~~~
Duplicera detta kodstycke för att öka antalet slides i Slide-Access.

~~~
<article class="jsfader-content">
		<img src="jsfader/img/bild.jpg" alt="">
		<section class="jsfader-textarea">
			<h1 class="Slide-Access-header">Rubrik</h1>
			<p>Text</p>
			<a href="">Länk</a>
		</section>	
	</article>
~~~
Ändra inställningar i följande del i slideaccess.js:

~~~
$.fn.slideaccess({
'slideaccess_duration': 5000,	// Slideshow speed.
'slideaccess_width': 940, 		// Slideshow width (px).
'slideaccess_height': 340,		// Slideshow height (px).
'slideaccess_img_width': 940,	// Slideshow width (px).
'slideaccess_fade_speed': 300,	// Slideshow fade speed (px).
'slideaccess_start_slide': 1,	// Slideshow start node. 1 is default.
'slideaccess_textarea_bg': '#000000',	// Slideshow background color for text area.
'slideaccess_textarea_opacity':	0.8,	// Slideshow opacity for text area.
'slideaccess_textarea_padding':	15,	// Slideshow padding for the text area.
'slideaccess_font_family': 'arial',	// Slideshow font type.
'slideaccess_font_color': '#fff',	// Slideshow font size (px).
'slideaccess_font_size': 16,	// Slideshow <p> size (px).		
'slideaccess_header_size': 28,	// Slideshow header size (px).
'slideaccess_a_color': '#0080dd',	// Slideshow <a>; color.
});
~~~
Vid frågor, kontakta mig på morgan@ceken.se.
