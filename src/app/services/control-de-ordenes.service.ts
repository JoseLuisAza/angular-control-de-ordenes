import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlDeOrdenesService {
  domain:String="http://localhost:3000";//dominio o host del servidor node.js
  pathisRegistered:String=this.domain+"/isUserRegistered";
  pathaddUser:String=this.domain+"/addUser";
  pathArticulos:String=this.domain+"/getArticulos";//ruta para obtener los articulos de la base de datos
  pathArticulosGeneral:String=this.domain+"/getArticulosGeneral";
  pathArticulosStore:String=this.domain+"/getArticulosStore";
  pathnewItem:String=this.domain+"/newItem";
  pathDelteItem:String=this.domain+"/deleteItem";
  pathUpdateItem:String=this.domain+"/updateItem";
  localStorage:any;
  constructor(protected http: HttpClient) { 
    this.localStorage=window.localStorage;
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

  public updateItem(data:any)
  {
    return this.http.post(this.pathUpdateItem.toString(),data);
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

  public allStorage() {

    var values = [],
        keys = Object.keys(this.localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( this.localStorage.getItem(keys[i]) );
    }

    return values;
}

}
