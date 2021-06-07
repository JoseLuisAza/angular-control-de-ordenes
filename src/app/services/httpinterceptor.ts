import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // obtenemos el token de Auth0 Custom API guardado en localStorage
        const token_Auth0_Custom_API = localStorage.getItem('auth0T');
        const token_Auth0_Management_API= localStorage.getItem('auth0_T_M_API');

        // si en la solicitud hay una cabecera que diga que la peticion es hacia
        // Auth0 Management API y requiere otro token
        if(req.headers.get("MAPI"))
        {
            console.log("MAPI");
            // loggerBluter.info('MAPI');
            // ATTENTION si no se elimina el header MAPI el Mangement API de Auth0 falla 
            // y no devuelve el codigo de eror correspondiente porque la cabecera MAPI no la reconoce
            // la cabecera MAPI es generada por la aplicacion bluter y no pertenece a http
            // clona de nuevo y se elimina el header personalizado MAPI
            const request = req.clone({
                headers:req.headers.delete('MAPI')
            });
            // se examina si existe un token Management API
            if (!token_Auth0_Management_API) {

                console.log("No existe token MAPI");
                // NOTE
                // enviamos la peticion ya sin el header custom MAPI para que auth0
                // nos devuelva el estado 401 con el error de que falta el token
                // entonces nuestra aplicacion pide el token y vuelve a enviar la peticion

                return next.handle(request);
            }

            // clona el objeto req y reestablece los headers y adjunta el token de Auth0 Management API
            const request2 = req.clone({
                headers: request.headers.set('Authorization', `Bearer ${token_Auth0_Management_API}`)
            });

            // se llama a objeto next y a su mentodo handle y se le pasa el objeto request modificado
            // y se envia
            return next.handle(request2);
        }
        else if(req.headers.get("Paypal"))
        {
            const request = req.clone({
                headers:req.headers.delete('Paypal')
            });
            return next.handle(request);
        }
        //No hacer nada si el token Auth0 Custom API no existe seguir con la solicitud 
        // sin hacer nada
        else if (!token_Auth0_Custom_API) {
            return next.handle(req);
        }
        // si en la solicitud hay una cabecera que anula adjuntar el token
        // por alguna situacion
        else if(req.headers.get("skip"))
        {
            // no hacer nada y seguir con la solicitud
            return next.handle(req);
        }
        console.log("CAPI");
        // clona el objeto req y reestablece los headers y adjunta el token
        const headers = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token_Auth0_Custom_API}`)
        });
        return next.handle(headers);
    }
}