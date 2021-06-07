import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
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
  showModalUpdate:boolean=false;
  user:any;
  formData:any;//objeto que contendra la imagen y los datos del item
  subido:any;//varible que guardara el porcentaje de lo subido

  constructor(private cdo:ControlDeOrdenesService, private router:Router, public auth0Service: AuthService ) { 

    /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
    this.auth0Service.user$.subscribe(
      x =>  {
        this.user={"user_id":x['http://softland.comuser_id']};
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
        this.showModalUpdate=true;
      }},
  ];

  $("#formUpdate").on("submit", (e)=>
  {
      e.preventDefault();
      //this.fileSize();
      console.log('submit');

  });
  }

  public delete()
  {
    let data={'idproducto':this.item.idproducto};
    this.cdo.deleteItem(data).subscribe(
      data=>{
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

  public  fileSize(nombre,precio,detalles)
  {
        //$("#subidafile").slideDown();//muestra subidafile
        //if(this.validateFileSize())//valida el tamaño del archivo a subir
        //{
            this.formData = new FormData();
            this.formData.append('nombre',nombre);
            this.formData.append('precio',precio);
            this.formData.append('detalles',detalles);
            this.formData.append('idproducto',this.item.idproducto);
            /*Nos suscribimos para obtener el user id */
            // this.auth0Service.userProfile$.subscribe(
            //   x =>   this.formData.append("user_id",x['http://softland.comuser_id']), //obtenemos la fecha y se la pasamos a la variable created_at
            //   err => console.error('Observer got an error: ' + err),//si hay error
            //   () => console.log('Observer got a complete notification')//completo la notificacion del observer
            // );
            this.uploadFile();//ejecuta funcion para subir archivo
        // }
        // else{
        //   //si el archivo esta demasiado grande
        //     iziToast.error({
        //         title: 'Error',
        //         message: 'Documento demasiado grande!',
        //     });
        // }

  }

  private validateFileSize() 
  {
    let fileSize:number= $('#validatedCustomFile')[0].files[0].size;
    let maxSizeMB:number=10;
    if (fileSize > maxSizeMB*1024*1024) {
        return false;
    }
    return true;
  }

  private uploadFile()
  {
     this.cdo.updateItem(this.formData).subscribe(
       data=>{
        if(data['affectedRows']>=1)
        {
          //Mostramos un mensaje
          iziToast.success({
            title: 'success',
            message: 'Articulo Actualizado!',
          });

          //ocultamos el modal
          this.showModalUpdate=false;
          //volvemos a cargar el componente
          this.router.navigate(['/profile']);
        }
        else
        {
          //si no fue afectada ninguna fila en la base de datos
          //mostramos un mensaje
          iziToast.error({
            title: 'error',
            message: 'Hubo un error.. No se actualizo Articulo!',
          });
        }
      },
         (error) =>{
             console.error(error)
            }
      );
  } 

}
