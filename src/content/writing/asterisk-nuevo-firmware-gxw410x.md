---
title: Nuevo firmware gxw410x
date: '2008-10-28'
lang: es
description: Por fin. llevamos esperando este firmware, aproximadamente 6 meses. En concreto es el Firmware 1.0.1.10 para el GXW4104 y para el GXW4108. Correcciones de errores (BUGS) • (LISTO) inundación (flooding) de consultas DNS…
series: medellin-asterisk
originalUrl: https://medellinasterisk.blogspot.com/2008/10/nuevo-firmware-gxw410x.html
---

[<img src="/media/writing/cd536dab3bc67d6d.webp" loading="lazy" alt="Imagen del artículo original" />](/media/writing/cd536dab3bc67d6d.webp)  
Por fin.  
  
llevamos esperando este firmware, aproximadamente 6 meses.  
En concreto es el Firmware [1.0.1.10](http://www.grandstream.com/DOWNLOAD/FIRMWARE/GXW4104_GXW4108/Release_Note_GXW4104_GXW4108_1.0.1.10.pdf) para el GXW4104 y para el GXW4108.  
  
  
  
  
Correcciones de errores (BUGS)  
  
• (LISTO) inundación (flooding) de consultas DNS del servidor STUN si no es válido.  
• (LISTO) seguir intentando descargar la actualización del firmware, si la dirección del servidor no es válido.  
• (LISTO) el sistema no funciona a menos que ID de usuario se configura  
• (LISTO) error en ring-no-answer en los anteriores versiones.  
• (LISTO) LED no se ilumina después de que el sistema arranca con éxito  
• (LISTO) GXW4108 local SIP Escuchar opción de configuración del puerto  
ch1: 5061; ch2: 5062; CH3: 5063; CH4: 5064; C5: 5065; C6: 5066; CH7: 5067; CH8: 5068  
  
Algunos de las mejoras  
• Nueva y cargador de arranque para manejar mejor el sistema de recuperación si es necesario. • Mejora de las regiones PSTN, y detección CID . • Nuevo detector de tono (DTMF, progreso de tonos de llamada).  
• Se ha añadido soporte para la regeneración del flash.  
• Plan de marcación Mejorado, permitir la sustitución en un bloque del centro del segmento, tales como: (\<0\> \[2-9\] xx \<15\> x)  
  
Las tres mejoras resaltadas, Son imperdibles, ya que estos temas han dado algo de lidia(problemas).  
  
Bueno me dispongo a actualizar mis gateway. sin tengo algún problema les cuento.  
  
  
Para actualizar, se pueden dirigir a [grandstream firmware](http://www.grandstream.com/firmware.html).  
Para ver la lista de cambios completa [aquí.](http://www.grandstream.com/DOWNLOAD/FIRMWARE/GXW4104_GXW4108/Release_Note_GXW4104_GXW4108_1.0.1.10.pdf)
