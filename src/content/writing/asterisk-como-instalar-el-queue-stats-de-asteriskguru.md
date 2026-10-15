---
title: como instalar el queue stats de asteriskguru
date: '2008-07-28'
lang: es
description: Esta herramienta le ayudará a tener una mejor visión de las llamadas entrantes y salientes que pasan a través de su servidor Asterisk. Supongo que usted tiene algunos conocimientos básicos en Asterisk, PHP y bases de…
series: medellin-asterisk
originalUrl: https://medellinasterisk.blogspot.com/2008/07/estadisticas-colas-queue-stats.html
---

Esta herramienta le ayudará a tener una mejor visión de las llamadas entrantes y salientes que pasan a través de su servidor Asterisk. Supongo que usted tiene algunos conocimientos básicos en Asterisk, PHP y bases de datos.  
  
La aplicación Hace lectura de los archivos queue_log y el cdr (call detail registry), coloca su contenido en una base de datos y de allí recibe otro tipo de estadísticas para un grupo de opciones.  
  
Esta aplicación utiliza jpGraph para el producto de gráficos que está con licencia QPL.  
  
  
**PREQUISITOS**  

<div>

Para usar esta estadística que usted necesita:  
  

- [Asterisk](http://www.asterisk.org/)
- [PHP](http://www.php.net/) superior a 4.3.5
- Base De Datos [posgreSQL](http://www.postgresql.org/)
- [ZendOptimzer](http://www.zend.com/en)

Ya que los scripts en php están encriptados, necesitamos el zendoptimzer para que el apache los pueda leer.  
  
Despues de instalado todos los prerequisitos.  
bajamos la version mas reciente de [aqui](http://asteriskguru.com/tools/queue_stats.php)  
  
la ponemos en /var/www (debian)  
  
lo descomprimos. (tar -xvf queue_stats.0.3.0.tar)  
entrmaos al directorio.  
creamos la base de datos. personalmente uso el phppgadmin.  
creamos las tabalas de acuerdo al archivo ../db/db.sql  
  
Luego configuaramos un avountcode, para que todas las llamadas queden registardas en un CVS aparte.  
  
/etc/asterisk/sip.conf o iax.conf  

> \[some_username\]  
> type=friend  
> secret=password  
> callerid=" some_callerid"  
> disallow=all  
> allow=gsm  
> context=iaxcontext  
> auth=md5,plaintext,rsa  
> qualify=no  
> host=dynamic  
> notransfer=yes  
> transfer=no  
> accountcode=support

hacer esto para cada interno que deseamos monitorear. a mi me gusta hacerlo por el nombre de la cola.  
  
luego configuramos el queuestat.  
  
para configurar el log editamos el ../log/config.inc.php  
debe quedar asi.  

> \$db_host = "127.0.0.1";  
> \$db_name = "db-name";  
> \$db_user = "usename";  
> \$db_pass = "pass";  
>   
> \$conn_string = "host=\$db_host dbname=\$db_name user=\$db_user password=\$db_pass";  
> \$db_connect = pg_connect(\$conn_string);  
> ?\>  

para configurar las stadisticas de colas editamos el ../include/config.inc.php  
modificamos el timezone por -5 para medelllin colombia  
debe quedar asi.  
  

> // The images for the reports have to be saved locally on your pc  
> // Therefore the webserver must have priviliges to write and read from the directory they will be stored  
> // The defalt directory is different and depends on the OS  
>   
> // For Linux it is "/tmp"  
> // For Windows it is "%USERPROFILE%\Local Settings\Temp" (usually C:\Documents and Settings\\Local Settings\Temp)  
>   
> // comment the OS that you are not going to use  
> // available values are linux or windows  
> \$os = "linux";  
> \#\$os = "windows";  
>   
> // The settings of the images_path for the OS you are not going to use does not matter.  
> // For Linux default image path is /tmp. You can change it but have to make sure that the webserver can write into it.  
> \$image_path_lin = "/tmp";  
>   
> // For windows you can also make a dir where the images to be stored but again you have to provide write access for the webserver.  
> \$image_path_win = "./pdf_images/";  
>   
> // Set the default language (EN)  
> \$default_language = "en";  
>   
> // Set default timezone  
> // Valid timezone is one of the following GMT values  
> // -12, -11, -10, -9.5, -9, -8.5, -8, -7, -6, -5, -4, -3.5, -3, -2, -1,  
> // 0, +1, +2, +3, +3.5, +4, +4.5, +5, +5.5, +6, +6.5, +7, +8, +9, +9.5, +10, +10.5, +11, +11.5, +12, +13, +14  
> \$default_timezone = "-5";  
>   
> // Valid start/end hour value is one of the following  
> // 00, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24  
> // Set default start hour  
> \$default_start_hour = "08";  
>   
> // Set default end hour  
> \$default_end_hour = "20";  
>   
> \$db_host = "127.0.0.1";  
> \$db_name = "db-name";  
> \$db_user = "usename";  
> \$db_pass = "pass";  
>   
> \$conn_string = "host=\$db_host dbname=\$db_name user=\$db_user password=\$db_pass";  
> \$db_connect = pg_connect(\$conn_string);  
>   
> ?\>

luego debemos ejecutar en un navegador /127.0.0.1/"nombre"/log/logque.php  
y /127.0.0.1/"nombre"/log/cdr.php  
  
estos llenar la base de datos.  
  
con esto teminamos. para mirar la estadisticas entramos en 127.0.0.1/"nombre".  
  
la proxima entrada les muestro como utilizarlo y un analisis de esta herramienta.  
  
Desde aquí le damos un agradecimiento muy especial [asterisk-guru](http://www.asteriskguru.com/), por esta útil herramienta  

</div>
