---
title: (HOW-TO)Instalacion de B410 en trixbox y posibles problemas
date: '2008-09-29'
lang: es
description: Hace algunos dias me pidieron instalar una tarjeta b410t de digium en un trixbox. en lo personal no me gusta trabajar con esta distribuccion, pero bueno, para quien lo necesite aqui les hago un pequeño HOW-TO ( como…
series: medellin-asterisk
originalUrl: https://medellinasterisk.blogspot.com/2008/09/b410-trixbox-posibles-problemas.html
---

Hace algunos dias me pidieron instalar una tarjeta [b410t](/writing/asterisk-b410t-digium/) de digium en un trixbox. en lo personal no me gusta trabajar con esta distribuccion, pero bueno, para quien lo necesite aqui les hago un pequeño HOW-TO ( como instalat digium B410 en trixbox) . Actualizado ya que hay mucho manuales que utiliza los antiguos paqutes de misdn que utilisan los comando tipo misdn-int, pero esto ya cambio por mISDN.  
  
Bueno a lo que vinimos,  
  
Primero actualizamos e instalamos lo necesario para compilar asterisk y zaptel.  

>   
> yum update  
> yum install bison bison-devel ncurses ncurses-devel zlib zlib-devel openssl \\ openssl-devel gnutls-devel gcc gcc-c++ make kernel-devel  
> yum install flex

Luego bajamos y descomprimos asterisk y zaptel acuerdate cambiar las X.X.X por la ultima version diponible. al hora de hacer este manual las versiones eran [asterisk-1.4.21.2](http://downloads.digium.com/pub/asterisk/releases/asterisk-1.4.21.tar.gz) y [zaptel-1.4.11](http://downloads.digium.com/pub/zaptel/releases/zaptel-1.4.11.tar.gz).  
  

> cd /usr/src/  
> wget http://downloads.digium.com/pub/asterisk/releases/asterisk-X.X.X.X.tar.gz  
> wget http://downloads.digium.com/pub/zaptel/releases/zaptel-X.X.X.tar.gz  
> tar -xzvf asterisk-X.X.X.X.tar.gz  
> tar -xzvf zaptel-X.X.X.tar.gz  

Compilamos zaptel con el soporte para b410 debes Tener internet en el instante ya que instalar el soporte mISDN[](http://www.misdn.org/) y sus aplicativos.  
  

> cd zaptel-X.X.X  
> ./configure  
> make  
> make install  
> /etc/init.d/zaptel start  
> make b410p  

  
busca los dispositivos ISDN que tengas en tu server  
  

> /etc/init.d/mISDN scan

  
  
Configura estos dispositivos  
  

> /etc/init.d/mISDN config

  
  
corre los drivers de estos dispositivos. en este momento los led's del la tarjeta prenden y apagan, si esto no es asi puedes tener problemas de interrupciones en tu servidor.  
  

> /etc/init.d/mISDN start

  
  
lo único que falta es tener el canal de asterisk chan_misdn  

>   
> cd /usr/src/asterisk-x.x.x  
> make clean  
> ./configure  
> make  
> cp channels/chan_misdn.so /usr/lib/asterisk/modules/  
> cp /usr/src/asterisk-1.4.21.2/configs/misdn.conf.sample /etc/asterisk/misdn.conf  

  
Una vez realizado estos comandos, tendremos que editar el archivo **/etc/asterisk/misdn.conf**  
puedes utilizar este ejemplo:  

> \[general\]  
> misdn_init=/etc/mISDN.conf  
> debug=0  
> ntdebugflags=0  
> ntdebugfile=/var/log/misdn-nt.log  
> ntkeepcalls=no  
> bridging=no  
> l1watcher_timeout=0  
> stop_tone_after_first_digit=yes  
> append_digits2exten=yes  
> dynamic_crypt=no  
> crypt_prefix=\*\*  
> crypt_keys=test,muh  
>   
> \[default\]  
> context=from-pstn  
> language=en  
> musicclass=default  
> senddtmf=yes  
> far_alerting=yes  
> allowed_bearers=all  
> nationalprefix=0  
> internationalprefix=00  
> rxgain=0  
> txgain=0  
> te_choose_channel=no  
> pmp_l1_check=no  
> reject_cause=16  
> need_more_infos=no  
> nttimeout=no  
> method=standard  
> overlapdial=yes  
> dialplan=0  
> localdialplan=0  
> cpndialplan=0  
> early_bconnect=yes  
> incoming_early_audio=no  
> nodialtone=no  
> presentation=-1  
> screen=-1  
> echocancel=yes  
> echotraining=no  
> jitterbuffer=4000  
> jitterbuffer_upper_threshold=0  
> hdlc=no  
> max_incoming=-1  
> max_outgoing=-1  
>   
> \[out\]  
> ports=1,2,3,4  
> context=from-pstn  
> msns=\*

ahora solo nos queda crear enlaces simbolicos en el rc para que arranquen los drviers antes que el asterisk.  
  

> ln -s /etc/init.d/mISDN /etc/rc5.d/S10mISDN  
> ln -s /etc/init.d/mISDN /etc/rc3.d/S10mISDN  
> ln -s /etc/init.d/mISDN /etc/rc4.d/S10mISDN  
> ln -s /etc/init.d/mISDN /etc/rc2.d/S10mISDN  

  
Para Configurar el FreePBX basta con crear una trncal CUSTOM. y Custom Dial String.  
Ponemos.  
  

> misdn/g:out/\$OUTNUM\$

  
Listo, espero que sea de gran ayuda.
