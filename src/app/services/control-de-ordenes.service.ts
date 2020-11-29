import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ControlDeOrdenesService {
  domain:String="http://localhost:3000";//dominio o host del servidor node.js
  pathArticulos:String=this.domain+"/getArticulos";//ruta para obtener los articulos de la base de datos
  constructor(protected http: HttpClient) { }

  public getArticulos()
  {
    return this.http.get(this.pathArticulos.toString());
  }
}
