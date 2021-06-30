import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlDeOrdenesService {
  domain:String="http://localhost:3000";//dominio o host del servidor node.js

  pathisRegistered:String=this.domain+"/usuario/isUserRegistered";
  pathaddUser:String=this.domain+"/usuario/addUser";
  pathArticulos:String=this.domain+"/usuario/getArticulos";//ruta para obtener los articulos de la base de datos
  
  pathArticulosStore:String=this.domain+"/publico/getArticulosStore";

  pathnewItem:String=this.domain+"/crud/newItem";
  pathDelteItem:String=this.domain+"/crud/deleteItem";
  pathUpdateItem:String=this.domain+"/crud/updateItem";

  pathArticulosGeneral:String=this.domain+"/tienda/getArticulosGeneral";
  pathFinishShop:string=this.domain+"/tienda/finishShop";
  pathFinishShop2:string=this.domain+"/tienda/finishShop2"

  pathVentasPorProducto:string=this.domain+"/reportes/ventasPorProducto"
  pathPromedioDePrecios:string=this.domain+"/reportes/promedioDePrecios"
  pathVentas:string=this.domain+"/reportes/ventas"
  localStorage:any;
  //Cabecera para usar Auth0 Management API
  headers_Auth0_Token_Management_API: any = new HttpHeaders({
    "Content-Type": "application/json", //Tipo de contenido a enviar
    MAPI: "true", //cabecera propia para que el interceptor anada el token correspondiente
  });

  //Cabecera para usar Auth0 Custom API
  headers_Auth0_Token_Custom_API: any = new HttpHeaders({
    "Content-Type": "application/json", //Tipo de contenido a enviar
  });

  constructor(protected http: HttpClient) { 
    this.localStorage=window.localStorage;

    this.set_token_Auth0_Custom_API();

  }


  /*Enviamos a nuestro servidor el usario para registrarlo en la base de datos*/
  public registrarVendedor(user:any)
  {
    return this.http.post(this.pathaddUser.toString(),user,{observe: 'body',responseType: 'text'})
  }

  /*Consultamos si el usuario ya esta registrado en la base de datos*/ 
  public isUserRegistered(user:any)
  {
    return this.http.post(this.pathisRegistered.toString(),user,{observe: 'body',responseType: 'text'})
  }

  public getArticulos(user:any)
  {
    return this.http.post(this.pathArticulos.toString(),user);
  }

  public getArticulosGeneral(user:any)
  {
    return this.http.post(this.pathArticulosGeneral.toString(),user);
  }

  public getArticulosStore()
  {
    return this.http.get(this.pathArticulosStore.toString());
  }

   /*Metodo para subir documento al sistema*/
   public uploadFile(formData:any)
   {
     return this.http.post(this.pathnewItem.toString(),formData,{observe: 'events',reportProgress: true,responseType: 'text', withCredentials: false})
   }

  public deleteItem(data:any)
  {
    return this.http.post(this.pathDelteItem.toString(),data);
  }

  public updateItem(formData:any)
  {
    return this.http.post(this.pathUpdateItem.toString(),formData);
  }

  

  public agregarCarrito(item,cantidad:number):Observable<string>
  {
    //localStorage.clear();
    let obs$=new Observable<string>(subcriber=>{
      let existeItem=JSON.parse(localStorage.getItem(item.idproducto));
      if(existeItem==null)
      {
        let compra={'idproducto':item.idproducto,'cantidad':cantidad};
        localStorage.setItem(item.idproducto,JSON.stringify(compra));
        subcriber.next('Agregado');
      }
      else
      {
          //convertimos a numero cantidad guardada en objeto en localstorage y la cantidad que ingreso el comprador
          let x: number =+existeItem.cantidad;
          console.log(x);
          let y:number=+cantidad;
          existeItem.cantidad=x+y;
          localStorage.setItem(item.idproducto,JSON.stringify(existeItem));
          subcriber.next('Agregado');
          
      }

    });
    return obs$;
  }


  public getTotalCarrito():Observable<number>
  {
    //localStorage.clear();
    let obs$=new Observable<number>(subcriber=>{
      subcriber.next(this.allStorage().length);
    });
    return obs$;
  }

  public getItemsCarrito():Observable<any[]>
  {
    //localStorage.clear();
    let obs$=new Observable<any[]>(subcriber=>{
      subcriber.next(this.allStorage());
    });
    return obs$;
  }

  public clarItemsCarrito():Observable<boolean>
  {
      let obs$=new Observable<boolean>(subcriber=>{
        this.localStorage.clear();
        subcriber.next(true);
      });
      return obs$;
  }

  public allStorage() {

    var values = [],
        keys = Object.keys(this.localStorage),
        i = keys.length;
    console.log(keys);
    console.log(i);
    while ( i-- ) {
        values.push( JSON.parse(this.localStorage.getItem(keys[i]) ));
    }

    return values;
}

  public finalizarCompra(formData:any)
  {
    return this.http.post(this.pathFinishShop.toString(),formData);
  }

  public finalizarCompra2(formData:any)
  {
    return this.http.post(this.pathFinishShop2.toString(),formData);
  }

  public ventasPorProducto(formData:any)
  {
    return this.http.post(this.pathVentasPorProducto.toString(),formData);
  }

  public ventas(formData:any)
  {
    return this.http.post(this.pathVentas.toString(),formData);
  }

  public promedioDePrecios(formData:any)
  {
    return this.http.post(this.pathPromedioDePrecios.toString(),formData);
  }

    // NOTE para obtener el token de Management API o Custom API de auth0 se pide el token
  // a el mismo endpoint pero con diferente audience
  public getTokenAuth0_custom_API() {
    let data: any = `{
      "client_id": "${environment.client_Id_Management}",
      "client_secret": "${environment.client_Secret_Management}",
      "audience":"${environment.audience_API_storebus}",
      "grant_type":"client_credentials"
    }`;
    return this.http.post(`https://${environment.domain_auth0}${environment.pathGetTokenAuth0}`, data.toString(), {
      headers: this.headers_Auth0_Token_Custom_API,
      responseType: "json",
    });
  }


  public set_token_Auth0_Custom_API(){
    //NOTE Token para custom API storebus
    this.getTokenAuth0_custom_API().subscribe(
      (data) => {
        // logger.info("Token obtenido de Auth0");
        // this.token_Auth0_Custom_API = data["access_token"];
        console.log(data);
        localStorage.setItem("auth0T", data["access_token"]);
        /*Nos suscribimos al metodo getTokenAuth0 del servicio que hace la peticion http 
      y que deuvuelve un objeto Observable */
      },
      (error) => {
        console.error(error);
        //logger.error("Fallo al obtener Token de Auth0");
      }
    );
}



}
