---
title: Problemas con el DTMF
date: '2008-05-29'
lang: es
description: Hace algunos días vengo trabajando con una planta celular tecom, pero he tenido múltiples inconvenientes, El que mas me preocupa es el DTMF. Hize varias pruebas (hasta utilicé una de las opciones nuevas del chan_sip el…
series: medellin-asterisk
originalUrl: https://medellinasterisk.blogspot.com/2008/05/problemas-dtmf.html
---

Hace algunos días vengo trabajando con una planta celular tecom, pero he tenido múltiples inconvenientes, El que mas me preocupa es el DTMF. Hize varias pruebas (hasta utilicé una de las opciones nuevas del chan_sip el relaxdtmf) pero no he conseguido resultados positivos. Me pregunte, pero a que se debe esto si el [dtmf](http://http//es.wikipedia.org/wiki/DTMF) es un estándar con muchos años a cuestas, utilicé una herramienta infaltable para cualquier profesional de asterisk. el [Audacity](http://audacity.sourceforge.net/). y grabe todos los dígitos que me entregaba la planta tecom.[<img src="/media/writing/235bb1a5cf9dcf49.webp" loading="lazy" alt="Imagen del artículo original" />](/media/writing/235bb1a5cf9dcf49.webp)Y utilice una de las mejores herramientas del audacity, el dibujador de espectro. con cada uno de los dígitos, se ve así.  
  
[<img src="/media/writing/2ee79b016ee4eee4.webp" loading="lazy" alt="Imagen del artículo original" />](/media/writing/2ee79b016ee4eee4.webp)y tome todos los datos respectivos. y los compare con la tabla de frecuencias del estándar. y obtuve los siguientes resultados y conclusiones.  
  
DTMF keypad frequencies  
  

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<tbody>
<tr>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
<tr>
<th><br />
</th>
<th>1209 Hz</th>
<th>1336 Hz</th>
<th>1477 Hz</th>
<th>1633 Hz</th>
</tr>
&#10;<tr>
<th>697 Hz</th>
<td><a href="http://upload.wikimedia.org/wikipedia/en/b/bf/Dtmf1.ogg">1</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/7/7d/Dtmf2.ogg">2</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/2/28/Dtmf3.ogg">3</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/d/d5/DtmfA.ogg">A</a></td>
</tr>
<tr>
<th>770 Hz</th>
<td><a href="http://upload.wikimedia.org/wikipedia/en/9/9f/Dtmf4.ogg">4</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/1/1c/Dtmf5.ogg">5</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/7/7b/Dtmf6.ogg">6</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/5/5a/DtmfB.ogg">B</a></td>
</tr>
<tr>
<th>852 Hz</th>
<td><a href="http://upload.wikimedia.org/wikipedia/en/9/9f/Dtmf7.ogg">7</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/f/f7/Dtmf8.ogg">8</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/5/59/Dtmf9.ogg">9</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/9/96/DtmfC.ogg">C</a></td>
</tr>
<tr>
<th>941 Hz</th>
<td><a href="http://upload.wikimedia.org/wikipedia/commons/e/e7/DtmfStar.ogg">*</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/2/2d/Dtmf0.ogg">0</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/commons/c/c4/Dtmf-.ogg">#</a></td>
<td><a href="http://upload.wikimedia.org/wikipedia/en/9/99/DtmfD.ogg">D</a></td>
</tr>
</tbody>
</table>

  
Datos Obtenidos  
  
tono 1 BUENO  
697(-6db) 1211(-1db) 1715(-7db)  
  
tono 2 BUENO  
696(-8db) 1335(1.8db) 1973(-8.5db)  
  
tono 3 REGULAR  
698(-8.4db) 1479(6db) 2256(-8.4db)  
  
tono 4 MALO  
767(-8.4db) 1211(-0.9db) 1648(-10db)  
  
tono 5 MALO  
768(-9db) 1334(2db) 1898(-8.3db)  
  
tono 6 BUENO  
771(-5) 1478(5.1db) 2185(-8.9db)  
  
tono 7 BUENO  
853(-4.6) 1210(-0.5db) 1565(-6.3db)  
  
tono 8 REGULAR  
854(-7.3db) 1336(1db) 1822(-6.5db)  
  
tono 9 REGULAR  
855(-7.6db) 1479(5.7db) 2102(-7.1db)  
  
tono 0 MALO  
779(-2db) 1335(1.4db) 1732(-5.4db)  
  
tono \* MALO  
921(-5.7db) 1197(-1.6db) 1469(-6.8db)  
  
tono \# MALO  
940(-7.8db) 1480(5.8db) 2013(-7db)  
  
llegue a la conclusión que algunos de los dígitos la tecom los manda muy distorsionados. ejemplo casi todos los datos que definen las filas(697,850,941) están con muy baja potencia exceptuando 770. también veo problemas con el tercer pico, en el dígito 4 se puede interpretar el carácter como un 4 o una B.
