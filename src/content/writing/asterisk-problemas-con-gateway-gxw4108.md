---
title: Problemas con Gateway gxw4108
date: '2008-06-04'
lang: es
description: La mayoría de las veces que doy soporte con respecto a un Gateway Grandstream ya sea el GXW 4108 o GXW 4104, lo doy sobre el colgado de las lineas, el principal problema que tengo es que en Colombia pocas telcos, sigen…
series: medellin-asterisk
originalUrl: https://medellinasterisk.blogspot.com/2008/06/problema-gateway-gxw4108-gxw4104.html
---

La mayoría de las veces que doy soporte con respecto a un Gateway Grandstream ya sea el GXW 4108 o GXW 4104, lo doy sobre el colgado de las lineas, el principal problema que tengo es que en Colombia pocas telcos, sigen los estándares de la ITU, para el [tone progress](http://www.itu.int/dms_pub/itu-t/oth/02/06/T02060000040002PDFS.pdf), entonces cada linea puede llegar a tener un tone progress diferente.  
  
En algunas lineas me ha funcionado la siguiente conflagración:  

>   
> Dial tone: ch1-4:f1=425@-10,f2=425@-10,c=0/0;  
> Ringback tone: ch1-4:f1=425@-10,f2=425@-10,c=100/450;  
> Busy Tone: ch1-4:f1=425@-10,f2=425@-10,c=50/50;  
> Reorder tone: ch1-4:f1=425@-10,f2=425@-10,c=30/40;  
> Confirmation tone: ch1-4:f1=425@-10,f2=425@-10,c=10/10;

  
  
Conparada con el documento de la ITU.  
  

> Colombia (Republic of)  
> Busy tone - 425 0.25 on 0.25 off  
> Congestion tone - 425 0.10 on 0.25 off 0.35 on 0.25 off 0.65 on 0.25 off  
> Dial tone - 425 continuous  
> Number unobtainable tone - 425 0.65 on 0.25 off 0.20 on 0.60 off  
> Pay tone - 50/12000/16000 0.15 on  
> Ringing tone - 425 1.0 on 4.5 off  
> Special information tone - 950/1400/1800 3x0.333 on 1.0 off

- Congestion Tone y Reorder Tone, son lo mismo.

  
en este caso el busy tone y reorder tone, no cuadran con el estándar, pero lo que funciona no se cambia.  
  
Recuerden que para que la desconexión por tonos deben poner lo siguiente en la seccion FXO LINES.  
  
Enable Current Disconnect: No  
Enable Tone Disconnect: Yes  
Enable Polarity Reversal: No  
  
Espero que les sirva, estos datos. proximamente voy ampliar sobre esto. y como utilizar audacity para detectar los tono de una linea en particular tal y como lo hize con el [DTMF](/writing/asterisk-problemas-con-el-dtmf/).
