import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth0Service } from 'src/app/services/auth0.service';
import { ControlDeOrdenesService } from 'src/app/services/control-de-ordenes.service';
import {Router} from '@angular/router';

declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  user:any;//objeto que va a contener informacion del usuario logeado
  formData:any;//objeto que contendra la imagen y los datos del item
  subido:any;//varible que guardara el porcentaje de lo subido
  valueprogress:number=0;
  constructor(private cdo:ControlDeOrdenesService, public auth0Service: Auth0Service, public router:Router) { }

  ngOnInit() {
    /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
    this.auth0Service.userProfile$.subscribe(
      x =>  this.user={"user_id":x['http://softland.comuser_id']},//obtenemos la fecha y se la pasamos a la variable created_at
      err => console.error('Observer got an error: ' + err),//si hay error
      () => console.log('Observer got a complete notification')//completo la notificacion del observer
    );

    $("form#formajax").on("submit", (e)=>
    {
        e.preventDefault();
        this.fileSize();

    });
  }


  private fileSize()
  {
        //$("#subidafile").slideDown();//muestra subidafile
        if(this.validateFileSize())//valida el tamaño del archivo a subir
        {
            this.formData = new FormData($("form#formajax")[0]);//document.getElementById("formuploadajax")
            this.formData.append('nombre',$("form#formajax").find('input[name="nombre"]').val());
            this.formData.append('precio',$("form#formajax").find('input[name="precio"]').val());
            this.formData.append('detalles',$("form#formajax").find('input[name="detalles"]').val());
            /*Nos suscribimos para obtener el user id */
            this.auth0Service.userProfile$.subscribe(
              x =>   this.formData.append("user_id",x['http://softland.comuser_id']), //obtenemos la fecha y se la pasamos a la variable created_at
              err => console.error('Observer got an error: ' + err),//si hay error
              () => console.log('Observer got a complete notification')//completo la notificacion del observer
            );
            this.uploadFile();//ejecuta funcion para subir archivo
        }
        else{
          //si el archivo esta demasiado grande
            iziToast.error({
                title: 'Error',
                message: 'Documento demasiado grande!',
            });
        }

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
     $("#upload").css("display","grid");
     this.cdo.uploadFile(this.formData).subscribe(event=>{
         if (event.type === HttpEventType.DownloadProgress) {
          //  console.log(event.loaded); //downloaded bytes
          //  console.log(event.total); //total bytes to download
         }
         if (event.type === HttpEventType.UploadProgress) {
 
             this.subido=((event.loaded / event.total)*100).toFixed(0);//divide lo cargado dentro del total de peso y lo multiplica por 100 y saca solo numero entero
             var KB=(event.loaded/1024).toFixed(2);//guardamos lo cargado y lo dividimos en 1024 para sacar los KB con solo dos decimales
            
             this.valueprogress=Number(((event.loaded*100)/event.total).toFixed(0));
            
             //  $('#subidafile')
            //  .progress({
            //      total: 8,//establecemos el total del progreso que sera el mismo de numero de hojas
            //      text: {//establecemos el texto que aparecera debajo del progress
            //          active  : 'Subiendo', //{value} de {total} paginas',// texto cuando el progress esta activo
            //          success : 'Subida completa!'//el texto cuando el progress haya concluido
            //          }
            //  })
             //;
             //$('#subidafile').progress('set progress',this.subido);//aumentamos el progreso con lo subido
             //$('#subidafile').progress('set label',KB + " KB transferidos");//mostramos los KB subidos
             if(this.subido==100)
             {
              setTimeout(() => {
                this.router.navigate(['/profile']);
              },1000);  
             }
         }
         if (event.type === HttpEventType.Response) {
           /*Se muestras notificaciones depende el codio de status devuelto y se muestra
             en la notificacion el body de la respuesta */
           //si el archivo ya existe
          switch (event.status) {
            case 200:
              iziToast.info({
                title: 'info',
                message: ''+event.body,
            });
            break;
            //si el archivo fue subido con exito
            case 201:
              iziToast.success({
                title: 'success',
                message: ''+event.body,
            });
            break;
            //Si hubo un error interno del servidor
            case 500:
              iziToast.error();
              ({
                title: 'Error',
                message: ''+event.body,
              });
              break;
            //si no hubier codigo de respuesta mostramos lo que viene
            default:
              iziToast.info({
                title: 'Info',
                message: ''+event.body,
            });
              break;
          }
         }
         },
         (error) =>{
             console.error('No connection to Server')
             iziToast.error({
                title: 'Error',
                message: 'No connection to Server',
            });
            }
         );
  } 

}
