---
title: B410T digium
date: '2008-09-29'
lang: es
description: Hace días o mas bien meses tenia ganas de probar la tarjeta de digium b410p, es una excelente tarjeta que permiten conectar hasta 4 líneas RDSI BRI con un cancelador de eco muy bueno ( incluye un cancelador de eco de…
series: medellin-asterisk
originalUrl: https://medellinasterisk.blogspot.com/2008/09/b410t-digium.html
---

Hace días o mas bien meses tenia ganas de probar la tarjeta de [digium](http://www.digium.com/) b410p, es una excelente tarjeta que permiten conectar hasta **4 líneas [RDSI BRI](http://en.wikipedia.org/wiki/Basic_rate_interface)** con un cancelador de eco muy bueno ( incluye un **cancelador de eco de 64ms o 512 taps por cada uno de los 8 canales** (de la marca Octasic).) y la calidad es muy buena.  
  
[](http://www.digium.com/images/products/b410p-lrg.jpg)

*Imagen original no disponible: [Imagen del artículo original](http://www.digium.com/images/products/b410p-lrg.jpg).*

  
Para instalarla en debian es muy sencillo, cuando estés compilando el zaptel  
  

> cd /usr/src/zaptel-x.y.z  
> ./configure  
> make  
> make b410p  
> make install  
> make config

  
  
debes Tener internet en el instante ya que instalar el soporte [mISDN](http://www.misdn.org/) y sus aplicativos.  
  

> /etc/init.d/mISDN scan

  
  
busca los dispositivos ISDN que tengas en tu server  
  

> /etc/init.d/mISDN config

  
  
configura estos dispositivos  
  

> /etc/init.d/mISDN start

  
corre los drivers de estos dispositivos. en este momento los led's del la tarjeta prenden y apagan, si esto no es asi puedes tener problemas de interrupciones en tu servidor.  
  
lo único que falta es tener el canal de asterisk chan_misdn  
  
cd /usr/src/asterisk-x.x.x  
make clean  
./configure  
make  
cp channels/chan_misdn.so /usr/lib/asterisk/modules/  
cp /usr/src/asterisk-1.4.21.2/configs/misdn.conf.sample /etc/asterisk/misdn.conf  
  
luego es modificar el archivo misdn.conf, según tu configuración  
  
bastante facil no.  
  
POSIBLES PROBLEMAS:  
que no detecte tu tarjeta, ya que tu puerto PCI no es PCI 2  
  
/etc/init.d/mISDN scan \#no detecta ninguna tarjeta.  
  
también puedes tener problemas de interrupciones, todo va bien pero cuando le das misdn start, no encienden los led's, puedes mirar  
  
dmesg\|tail  
  
en un servidor muy viejo que utilizó para hacer pruebas de hardware tenia este problema, y con problemas de interrupciones por que tenia tarjeta de vídeo pci, no logre hacerla andar. reportaba que no tenia IRQ valida para esta tarjeta.
