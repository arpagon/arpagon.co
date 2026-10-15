---
title: Instalacion y configuracion del flash panel operator
date: '2008-06-18'
lang: es
description: Hoy les mostrare como instalar y configurar una de las mejores aplicaciones y mas distribuidas escritas especialmente para asterisk, es el Flash Panel Operator , de asternic o Nicolás Gudiño. El Flash Panel Operator es…
series: medellin-asterisk
originalUrl: https://medellinasterisk.blogspot.com/2008/06/instalacion-configuracion-fop-flash.html
---

Hoy les mostrare como instalar y configurar una de las mejores aplicaciones y mas distribuidas escritas especialmente para [asterisk](http://www.asterisk.org/), es el [Flash Panel Operator](http://www.asternic.org/) , de asternic o Nicolás Gudiño.  
  
[<img src="/media/writing/4edac6f541cdee8f.webp" loading="lazy" alt="Imagen del artículo original" />](/media/writing/4edac6f541cdee8f.webp)  
El [Flash Panel Operator](http://www.asternic.org/) es una aplicación escrita en perl que se ejecuta en un navegador web con el plugin de flash. Es capaz de mostrar información de su PBX y actividad en tiempo real. El diseño es configurable (botones tamaños y colores, iconos, etc.). Puede tener más de 100 botones por pantalla activa.  
Usted puede dar un vistazo a:  

- Qué extensiones están ocupados, timbrando o disponible.
- Quien está hablando y con quién.
- SIP y IAX información de registro, situación y accesibilidad.
- Estado de Colas (número de usuarios en espera).
- Indicador de mensajes en espera y contar
- Parked channels
- Agentes Identificados.

Para instalarlo necesitas tener conocimientos básicos en [asterisk](http://www.asterisk.org/), tener instalado perl. configurar el manager.conf, y un servidor [apache](http://www.apache.org/).  
  
Instalación  
  
Descargue la versión mas reciente, en la pagina de asternic en la esquina superior derecha esta el link de la versión mas reciente. al momento de escribir este post es [esta](http://www.asternic.org/files/op_panel-0.29.tar.gz). luego  
  
Copiar los archivos en el subdirectorio flash a un lugar adecuado en su servidor web. Si su web raíz es /var/www/, puede crear un subdirectorio 'panel'  
  

> \#mkdir/var/www/panel

  
y copia los archivos.  
  

> \#cp flash/\* /var/www/html/panel/.

  
luego de hacer esto. podemos empezar a configurar el servidor del panel.  
primero configurar el manager del [asterisk](http://www.asterisk.org/) (/etc/asterisk/manager.conf).  
debe estar habilitado.  
  
Configurar Asterisk  

> \[general\]  
>
> ``` text
> enabled = yes
> port = 5038
> bindaddr = 0.0.0.0
> ```

``` text
;debes agregar un usuario para tu panel.


[ELusuarioDELpanel]

secret = USpanelpass

deny=0.0.0.0/0.0.0.0

permit=127.0.0.1/255.255.255.0

;permit=192.168.0.0/255.255.255.0    ;SI TU PANEL NO VA ESTAR EN EL MISMO SERVER.

read = system,call,log,verbose,command,agent,user

write = system,call,log,verbose,command,agent,user

Configurar el fop server.

Editar op_server.cfg y cambiar los parámetros apropiados para su configuración.

 manager_host  es el nombre de host o dirección IP de su Asterisk. si esta en el
         mismo server es 127.0.0.1.
manager_user   es la definida por el usuario en manager.conf (a raíz de este ejemplo de
         configuración, debe ser "ELusuarioDELpanel"(sin las comillas))
manager_secret es el secret definido para el usuario (a raíz de este ejemplo de
         configuración, debe ser "USpanelpass"(sin las comillas))
security_code  es el código para desbloquear el panel.

Editar op_buttons.cfg que se adapte a sus necesidades. La sintaxis es similar a los
archivos de configuración de asterisk. debemos crear aquí las extensiones que queremos
monitorear.

ej:

[SIP/100]
Position=1
Label="100 : peranito"
Extension=100
Context= dafult   ;si estas usando freepbx debe ser from-internal si estas
             ;usando solo asterisk debes poner un contexto valido
Icon=4
Voicemail_Context=default
VoiceMailExt=*101@default     ;si estas usando freepbx debe ser
                        ;*101@from-internal si estas usando
                        ;solo asterisk debes poner un contexto valido 

Panel_Context=default
[SIP/101]
Position=2
Label="101 : fulanito"
Extension=101
Context= dafult
Icon=4
Voicemail_Context=default
VoiceMailExt=*101@default      

Panel_Context=default



etc....
para monitorear alguna troncal

ej:


[SIP/myprovider]

Position=20-30

Label="SIP TRUNK"

Extension=-1

Icon=4



[Zap/1]

Position=52

Label="Zap 1"

Extension=-1

Icon=3

Panel_Context=default

Configurar el estilo.

Editar op_style.cfg para cambiar el diseño visual. Puede cambiar el tamaño de los botones,
los colores, la colocación de los iconos, el tamaño. etc... usted puede tener más de 100 botones
en la pantalla.
esta sección la puedes poner al gusto, aqui les dejo un ejemplo(125 botones).


[general]

shake_pixels=2

dimm_noregister_by=20

dimm_lagged_by=60

enable_label_background=0

enable_crypto=1            ; set to 1 for encrypting server to client traffic

enable_animation=1

use_embed_fonts=1

ledcolor_ready=0x00A000

ledcolor_busy=0xA01020

ledcolor_agent=0xD0d020

label_font_size=8

label_font_family=Verdana  ; only valid when use_embed_fonts is disabled

label_font_color=000000

label_shadow_color=dddddd

label_margin_top=0

label_margin_left=35

label_shadow=1

clid_font_color=00dd00

timer_font_color=4000ff

clid_font_size=8

clid_font_family=Verdana   ; only valid when use_embed_fonts is disabled

clid_margin_top=11

clid_margin_left=35

timer_font_size=8

timer_font_family=Courier  ; only valid when use_embed_fonts is disabled

timer_margin_top=11

timer_margin_left=160

btn_width=195

btn_height=20

btn_padding=2

btn_line_width=1

btn_line_color=0x000000

btn_fadecolor_1=ccccff

btn_fadecolor_2=ffffff

btn_round_border=1

btn_highlight_color=ff0000

led_scale=60

led_margin_top=10

led_margin_left=20

arrow_scale=60

arrow_margin_top=5

arrow_margin_left=5

icon1_margin_top=10

icon1_margin_left=-15

icon1_scale=5

icon2_margin_top=10

icon2_margin_left=-15

icon2_scale=5

icon3_margin_top=10

icon3_margin_left=-15

icon3_scale=5

icon4_margin_top=10

icon4_margin_left=-15

icon4_scale=5

icon5_margin_top=10

icon5_margin_left=-15

icon5_scale=5

icon6_margin_top=10

icon6_margin_left=-15

icon6_scale=5

mail_margin_left=-40

mail_margin_top=13

mail_scale=4

show_security_code=1

show_clid_info=0

show_btn_help=3

show_btn_debug=0

show_btn_reload=2

show_status=4
inicial el server.
darle permisos de ejecución al op_server.pl.


#chmod a+x op_server.pl
lo puedes poner /usr/local/sbin/ para llamarlo en cualquier momento desde consola o en el
directorio correcto darle.


#./op_server.pl
y listo, ya tienes andando el flash operator panel.


lo puedes ver en http://x.x.x.x/panel
para utilizar las funcionalidades del panel lo tienes que desbloquear. la contraseñas es la que
pusiste en security_code en op_server.cfg.

espero les sea de gran ayuda.

enlace. http://www.asternic.org/
```
