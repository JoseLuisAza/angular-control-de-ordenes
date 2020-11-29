import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ControlDeOrdenesService {
  domain:String="http://localhost:3000";//dominio o host del servidor node.js
  pathisRegistered:String=this.domain+"/isUserRegistered";
  pathaddUser:String=this.domain+"/addUser";
  pathArticulos:String=this.domain+"/getArticulos";//ruta para obtener los articulos de la base de datos
  pathArticulosGeneral:String=this.domain+"/getArticulosGeneral";
  pathnewItem:String=this.domain+"/newItem";
  pathDelteItem:String=this.domain+"/deleteItem";
  pathUpdateItem:String=this.domain+"/updateItem";
  constructor(protected http: HttpClient) { }


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

}
