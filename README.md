Elaborado por: Oswaldo Molina.

Repositorio para TEST de postulaciones cargo especialista Angular.

- Realizar clonación del repositorio.
- Realizar npm install.
- Realizar ng serve para levantar el servidor local.http://127.0.0.1:4200/

- Para validar despliegue en producción se utilizo plataforma GitHub: https://oswaldosoft.github.io/tutenlogin/login  

nota: Desde el despliegue en producción se consumen las diferentes Apis o micro servicios para logueo, listados Bookings del usuario contacto@tuten.cl ó para el calculo de hora UTC.

RUTAS: Frontend
Login:            https://oswaldosoft.github.io/tutenlogin/login
hora UTC:         https://oswaldosoft.github.io/tutenlogin/horautc
listado bookings: https://oswaldosoft.github.io/tutenlogin/home 

Usuario:testapis@tuten.cl
clave: 1234

- Contiene componente de Login Autenticación.
- Contiene componente listado de Bookings de contacto@tuten.cl
- Contiene servicio para el manejo de los endpoint del Problema 3 y Problema 2 Creación para ApiRest Calculo de Hora - Timezone.
- Contiene componente para el consumo de Hora - Timezone

Se anexa la clase generada de forma local y despliegue de forma remota.
- Servidor localhost:8080/api/hora_utc desarrollada en Spring Boot con el IDE Suite 4.
- Servidor remoto en heroku: https://horautc.herokuapp.com/  

FUENTES:
-----------------------------------------------------------------------------------------------
1- Archivo TutenREST.java:
package com.init.rest;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins="*")
@RestController
@RequestMapping("/api")
public class TutenREST<JSONObject> {	
	@PostMapping(value="hora_utc",produces= {MediaType.APPLICATION_JSON_VALUE})
	    public  Map<String, Object>  post(@RequestParam(name="dato1")  @DateTimeFormat(pattern = "HH:mm:ss") LocalTime dato1, @RequestParam int dato2) {		
	    Map<String, Object> rtn = new LinkedHashMap<>();
	    Map<String, Object> rtn2 = new LinkedHashMap<>();
	    rtn2.put("time", dato1.plus(dato2, ChronoUnit.HOURS));
	    rtn2.put("timezone", "utc");
        rtn.put("response", (Object)rtn2);	    
	    return rtn;
	    }	
}
2- Archivo TutenApiUtcApplication.java:
package com.init.rest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
public class TutenApiUtcApplication {
	public static void main(String[] args) {
		SpringApplication.run(TutenApiUtcApplication.class, args);
	}
}
-----------------------------------------------------------------------------------------------