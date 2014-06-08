# Slider-Access(ability)

Slider-Access är en supertillgänglig slideshow som är utvecklad och optimerad även för personer med funktionsnedsättning. Slideshowen innehåller tydliga kontroller, utmärkt stöd för skärmläsare och har även support för att lägga till egen text. Inte bara bilder.

Slideshowen använder sig endast av Fade-funktionen vilket är att föredra för personer med kognitiva problem.

Slider-Access är helt enkelt ett utmärkt val för dig som prioriterar webbtillgänglighet!

## Funktioner och egenskaper:
* Utmärkta kontroller med tydliga etiketter
* Fullt responsiv
* Kognitivt anpassad
* Perfekt för personer med skärmläsare
* Anpassningspar
* Möjlighet att lägga in text

## Funktioner och egenskaper:
Här följer några punkter som gör Slider-Access unik i jämförelse med de 3 högt rankade slideshows på Google, SLIDERJS, WOW Slider och Cycle2:

* Play och pause-knapp
* Tillgängliga kontroller
* Bättre för skärmlasare
* Support för text
* Kognitivt annpassad


Följ dessa instruktioner för att installera Slider-Access:

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
			<h1 class="Slider-Access-header">Rubrik</h1>
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
	<!-- Slider counter -->	
		
</div>
~~~
Duplicera detta kodstycke för att öka antalet slides i Slider-Access.

~~~
<article class="jsfader-content">
		<img src="jsfader/img/bild.jpg" alt="">
		<section class="jsfader-textarea">
			<h1 class="Slider-Access-header">Rubrik</h1>
			<p>Text</p>
			<a href="">Länk</a>
		</section>	
	</article>
~~~
Vid frågor, kontakta mig på morgan@ceken.se.
