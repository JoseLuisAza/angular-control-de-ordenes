import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0Service } from 'src/app/services/auth0.service';
import { ControlDeOrdenesService } from 'src/app/services/control-de-ordenes.service';
declare var $:any;
declare var iziToast:any;
@Component({
  selector: 'app-articulo2',
  templateUrl: './articulo2.component.html',
  styleUrls: ['./articulo2.component.css']
})
export class Articulo2Component implements OnInit {

  @Input() item:any;
  opciones:any[];
  showModal:boolean=false;
  user:any;

  constructor(private cdo:ControlDeOrdenesService, private router:Router, public auth0Service: Auth0Service ) { 

    /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
    this.auth0Service.userProfile$.subscribe(
      x =>  {
        this.user={"user_id":x['http://softland.comuser_id']};
        console.log(this.user);
      },//obtenemos la fecha y se la pasamos a la variable created_at
      err => console.error('Observer got an error: ' + err),//si hay error
      () => console.log('Observer got a complete notification')//completo la notificacion del observer
    ); 
  }

  ngOnInit(): void {
    this.opciones = [
      {label: 'Eliminar', icon: 'pi pi-times', command: () => {
        this.showModal=true;
      }},

      {label: 'Actualizar', icon: 'pi pi-times', command: () => {
        //this.showModal=true;
      }},
  ];
  }

  public delete()
  {
    let data;//el objeto que se va a enviar al servidor para eliminar el archivo
    data=this.user;//se añade el usuario
    data.iditem=this.item.iditem;//se añda el id del item
    data.path=this.item.path;//se añade el path del item
    this.cdo.deleteItem(data).subscribe(
      data=>{
          console.log(data);
          //verificamos en el objeto que nos devuelve la respuesta si se afecto minimo una linea en la base de datos
          if(data['affectedRows']>=1)
          {
            //Mostramos un mensaje
            iziToast.success({
              title: 'success',
              message: 'Articulo eliminado!',
            });

            //ocultamos el modal
            this.showModal=false;
            //volvemos a cargar el componente
            this.router.navigate(['/profile/myitems']);
          }
          else
          {
            //si no fue afectada ninguna fila en la base de datos
            //mostramos un mensaje
            iziToast.error({
              title: 'error',
              message: 'Hubo un error.. No se elimino Articulo!',
            });
          }
        },
        err=>
        {
          //si hubo algun error en la peticion
          iziToast.error({
            title: 'error',
            message: 'Hubo un error intentalo de nuevo!',
          });
          console.log(err);
        });
  }

}
