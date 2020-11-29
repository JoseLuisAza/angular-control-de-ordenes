import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ControlDeOrdenesService {
  domain:String="http://localhost:3000";//dominio o host del servidor node.js
  pathArticulos:String=this.domain+"/getArticulos";//ruta para obtener los articulos de la base de datos
  pathnewItem:String=this.domain+"/newItem";
  pathDelteItem:String=this.domain+"/deleteItem";
  pathUpdateItem:String=this.domain+"/updateItem";
  constructor(protected http: HttpClient) { }

  public getArticulos()
  {
    return this.http.get(this.pathArticulos.toString());
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
