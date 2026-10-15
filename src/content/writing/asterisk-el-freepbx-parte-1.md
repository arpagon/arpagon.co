---
title: El Freepbx (parte 1)
date: '2008-05-28'
lang: es
description: El Freepbx es un proyecto Open source, que facilita la administración de un sistema asterisk, es un GUI web, con la características que con un par de cliks, ya tendremos extensión creadas y listas para ser…
series: medellin-asterisk
originalUrl: https://medellinasterisk.blogspot.com/2008/05/el-freepbx.html
---

El [Freepbx](http://www.freepbx.org/) es un proyecto Open source, que facilita la administración de un sistema asterisk, es un GUI web, con la características que con un par de cliks, ya tendremos extensión creadas y listas para ser utilizadas(tanto llamadas entrantes, como salientes). este se encargara de crear todos los cambios necesarios en los archivos de configuracion del asterisk /etc/asterisk/\*. La función principal es crear nuestro extensions.conf, este archivos es el encargado de todo el dialplan.  
  

<div>

Al crear una extensión, el [Freepbx](http://www.freepbx.org/) también nos modificara los archivos sip_additional.conf y iax_additional.conf, este nos creara directamente los parámetros por dafault, eseptuando el secret.  
  
y esto para mi gusto seria la gran falencia de este. miremos un ejemplo.  
  
  
[<img src="/media/writing/bd4802672bc1c3e0.webp" loading="lazy" alt="Imagen del artículo original" />](/media/writing/bd4802672bc1c3e0.webp)tendríamos que llenar lo siguiente.  
  

</div>

--\>  

<div>

User Extension: Nro de extensión a asignar

</div>

<div>

Display Name: Nombre personal

</div>

<div>

Secret: cualquierSECRETojalaCOMPLICADO

</div>

<div>

</div>

<div>

Este nos Crearía algo así en sip_additional.conf

</div>

<div>

\[ Nro de extensión a asignar\]  
type=friend  
secret= cualquierSECRETojalaCOMPLICADO  
record_out=Adhoc  
record_in=Adhoc  
qualify=yes  
port=5060  
pickupgroup=  
nat=yes  
mailbox=Nro de extensión a asignar@device  
host=dynamic  
dtmfmode=rfc2833  
disallow=  
dial=SIP/Nro de extensión a asignar  
context=from-internal  
canreinvite=no  
callgroup=  
callerid=device \<Nro de extensión a asignar\>  
allow=  
accountcode=  
call-limit=50

</div>

<div>

y no tendriamos forma de cambiar algunos parametros esenciales del sip.conf.

</div>

<div>

como el permit y el deny. que me crea una ACL, desde que direcciones se puede logear esta extencion.

</div>
