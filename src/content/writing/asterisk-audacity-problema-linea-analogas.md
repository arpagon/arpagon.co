---
title: Audacity, problema linea analogas
date: '2009-02-12'
lang: es
description: Hace días, no publicaba nada (ocupado con un proyecto bastante interesante, como era de esperar involucrado con asterisk). Este post se los debo hace varías semanas como solucionar problemas de colgado con en lineas…
series: medellin-asterisk
originalUrl: https://medellinasterisk.blogspot.com/2009/02/audacity-problema-linea-analogas.html
---

[](http://audacity.sourceforge.net/images/Audacity-logo-r_50pct.jpg)

*Imagen original no disponible: [Imagen del artículo original](http://audacity.sourceforge.net/images/Audacity-logo-r_50pct.jpg).*

Hace días, no publicaba nada (ocupado con un proyecto bastante interesante, como era de esperar involucrado con asterisk). Este post se los debo hace varías semanas como solucionar problemas de colgado con en lineas análoga con la mejor herramienta de sonido OpenSource [Audacity](http://audacity.sourceforge.net/).  
  
Por que de este post? Las líneas análogas existente varías formas de establecer el cuelgue de las llamadas atravez de la señalización, el problema radica en que hay muchas formas y en muchos casos hablando tanto nuevas instalaciones en telefonía ip y instalaciones de plantas telefónicas convencionales, tienen problema para detectar el cuelgue. para mas información les recomiendo estas lecturas.  
[Disconnect supervision](http://en.wikipedia.org/wiki/Special:Search/Disconnect_supervision)  
[Asterisk Disconnect Supervision](http://en.wikipedia.org/wiki/Special:Search/Asterisk_Disconnect_Supervision)  
[busy tone](http://en.wikipedia.org/wiki/Special:Search/busy_tone)  
[Plain old telephone service](http://en.wikipedia.org/wiki/Special:Search/Plain_old_telephone_service)  
  
La forma en que vamos a detectar el cuelgue sera gracias del **[Call-progress tone](http://en.wikipedia.org/wiki/Call-progress_tone)**, ya este es mas general y esta presente cualquier linea analoga el problema radica en la falta de estandarizacion de este en la diferentes regiones de america latina. para mas informacion recomiendo este documento de la ITU, para el [tone progress](http://www.itu.int/dms_pub/itu-t/oth/02/06/T02060000040002PDFS.pdf).  
  
Manos a la obra. para conseguir el tono de cuelgue ([Busy Tone](http://en.wikipedia.org/wiki/Special:Search/busy_tone))

*La publicación original incluía referencias a imágenes locales no recuperables.*

tenemos que encotrar 3 parámetros la frecuencia 1, la frecuencia 2 y la cadencia. Lo primero que debemos hacer es grabar el tono, a diferencia de como muchos piensan este no es tan dificil de grabar, ya que si tienes este problema del colgado de las lineas analogas, en la mayoria de los casos se ve reflejado en Buzones de voz llenos de este dichoso tono. si no lo tienes puedes grabarlo con un simple microfono.  
  
luego de tener el tono(en . wav), lo abrimos con audacity y tendran algo como esto.  
[<img src="/media/writing/e7b7a53bd2fd62dd.webp" loading="lazy" alt="Imagen del artículo original" />](/media/writing/e7b7a53bd2fd62dd.webp)  
  
  
  
  
lo primero que haremos sera medir la cadencia, para esto debemos alinear el principio del tono al segundo cero, selecionamos la primera parte y le damos recortar.  
[<img src="/media/writing/467cc8d40a7691a6.webp" loading="lazy" alt="Imagen del artículo original" />](/media/writing/467cc8d40a7691a6.webp)  
  
  
  
  
  
  
Ampliamos con la herramienta de zoom asi podremos saber cuanto tiempo dura el tono y luego cuanto mide el silencio.  
[<img src="/media/writing/1ae901500e4fe8a2.webp" loading="lazy" alt="Imagen del artículo original" />](/media/writing/1ae901500e4fe8a2.webp)  
  
  
  
  
  
  
En esta imagen vemos claramente que el silencio y el tono miden 0.25 segundos cada uno.  
La cadencia generalmente esta dada por un fraccionario, todos los equipos definen en que medidas.  

> ej. millisegundos 250/250 segundos 0.25/0.25

ahora obtendremos la frecuencia, con el tono señalado, utilizamos la herramienta.  
Analizar-----\>Dibujar Espectro  
  
[<img src="/media/writing/fe17d3af1670aba5.webp" loading="lazy" alt="Imagen del artículo original" />](/media/writing/fe17d3af1670aba5.webp)  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
Nos paramos en el primer pico y el nos dice cual es la frecuencia. en este caso es 436 Hz  
hacemos lo mismo con el segundo pico.  
en este caso el segundo pico esta por el orden de -43db, esto quiere decir que es irrelevante,  
  
este tono solo tiene una frecuencia.  
  
Listo ya tenemos todos los datos necesarios, del busy tone.  
Ejemplos de conflagración.  
  
Grandstream.  
Busy Tone: ch1-X:f1=436@-11,f2=436@-11,c=25/25;  
la x depende del equipo de grandstream si es un gxw 4108 o un 4104, o no se pone ch para los handy tones.  
NOTA: en los nuevos HandyTones 502 y 503 la cadencia se pone en millisegundos seria 250/250.  
Sipura  
Busy Tone: 436@-11,436@-11;10(.25/.25/1+2)  
  
Si conocen mas ejemplos de conflagración del Busy tone dejen los comentarios.
