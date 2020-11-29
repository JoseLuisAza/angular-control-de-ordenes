import { Component, OnInit } from '@angular/core';
declare var iziToast:any;
@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
  //   this.auth0Service.userProfile$.subscribe(
  //     x =>  this.user={"user_id":x['http://softland.comuser_id']},//obtenemos la fecha y se la pasamos a la variable created_at
  //     err => console.error('Observer got an error: ' + err),//si hay error
  //     () => console.log('Observer got a complete notification')//completo la notificacion del observer
  //   );

  //   $("form#formajax").on("submit", (e)=>
  //   {
  //       e.preventDefault();
  //       this.ProfileService.getAmountBooks(this.user).subscribe(
  //         data=>{
  //             this.amountBooks=data[0]['amount'];//asignamos a la variable la cantidad que nos devuelve el observable empieza con 0 porque es un array de objetos
  //             this.ProfileService.isPro(this.user).subscribe(
  //               data1=>{
  //                 this.isPro = (data1 =="true");//returns true)
  //                 //Si No es pro entonces evaluaremos la cantidad de libros
  //                 if(!this.isPro)
  //                 {
  //                   //subiremos el archivo si la cantidad de libros registrados es menor a libros permidos
  //                   if(this.amountBooks<this.bookAllow)
  //                   {
  //                     this.fileSize();
  //                   }
  //                   else
  //                   {
  //                     //Si ha llegado al limite de libros permitidos mostraremos un mensaje 
  //                     iziToast.error({
  //                       title: 'Error',
  //                       message: 'Haz llegado al limite de '+this.amountBooks+', actualiza tu plan!',
  //                     }); 
  //                     //Redireccionamos a pro
  //                     setTimeout(() => {
  //                       this.Router.navigate(['/pro']);
  //                     }, 1000);
  //                   }
  //                 }
  //                 else{
  //                   this.fileSize();
  //                 }
  //               },
  //               err=>
  //               {
  //                 console.log(err);
  //               }
  //             );
  //         },
  //         err=>
  //         {
  //           console.log(err);
  //         }
  //       );

  //   });
  // }


  // private fileSize()
  // {
  //       $("#subidafile").slideDown();//muestra subidafile
  //       if(this.validateFileSize())//valida el tamaño del archivo a subir
  //       {
  //           this.formData = new FormData($("form#formajax")[0]);//document.getElementById("formuploadajax")
  //           this.formData.append("archivo",'da');//concatenamos la variable al formData
  //           /*Nos suscribimos para obtener el user id */
  //           this.auth0Service.userProfile$.subscribe(
  //             x =>   this.formData.append("user_id",x['http://softland.comuser_id']), //obtenemos la fecha y se la pasamos a la variable created_at
  //             err => console.error('Observer got an error: ' + err),//si hay error
  //             () => console.log('Observer got a complete notification')//completo la notificacion del observer
  //           );
  //           this.uploadFile();//ejecuta funcion para subir archivo
  //       }
  //       else{
  //         //si el archivo esta demasiado grande
  //           iziToast.error({
  //               title: 'Error',
  //               message: 'Documento demasiado grande!',
  //           });
  //       }

  // }

  // private validateFileSize() 
  // {
  //   let fileSize:number= $('#validatedCustomFile')[0].files[0].size;
  //   let maxSizeMB:number=10;
  //   if (fileSize > maxSizeMB*1024*1024) {
  //       return false;
  //   }
  //   return true;
  // }

  // private uploadFile()
  // {
  //    $("#upload").css("display","grid");
  //    this.ProfileService.uploadFile(this.formData).subscribe(event=>{
  //        if (event.type === HttpEventType.DownloadProgress) {
  //         //  console.log(event.loaded); //downloaded bytes
  //         //  console.log(event.total); //total bytes to download
  //        }
  //        if (event.type === HttpEventType.UploadProgress) {
 
  //            this.subido=((event.loaded / event.total)*100).toFixed(0);//divide lo cargado dentro del total de peso y lo multiplica por 100 y saca solo numero entero
  //            var KB=(event.loaded/1024).toFixed(2);//guardamos lo cargado y lo dividimos en 1024 para sacar los KB con solo dos decimales
  //            $('#subidafile')
  //            .progress({
  //                total: 8,//establecemos el total del progreso que sera el mismo de numero de hojas
  //                text: {//establecemos el texto que aparecera debajo del progress
  //                    active  : 'Subiendo', //{value} de {total} paginas',// texto cuando el progress esta activo
  //                    success : 'Subida completa!'//el texto cuando el progress haya concluido
  //                    }
  //            })
  //            ;
  //            $('#subidafile').progress('set progress',this.subido);//aumentamos el progreso con lo subido
  //            $('#subidafile').progress('set label',KB + " KB transferidos");//mostramos los KB subidos
  //            if(this.subido==100)
  //            {
  //             setTimeout(() => {
  //               this.Router.navigate(['/profile/mybooks/books']);
  //             },1000);  
  //            }
  //        }
  //        if (event.type === HttpEventType.Response) {
  //          /*Se muestras notificaciones depende el codio de status devuelto y se muestra
  //            en la notificacion el body de la respuesta */
  //          //si el archivo ya existe
  //         switch (event.status) {
  //           case 200:
  //             iziToast.info({
  //               title: 'info',
  //               message: ''+event.body,
  //           });
  //           break;
  //           //si el archivo fue subido con exito
  //           case 201:
  //             iziToast.success({
  //               title: 'success',
  //               message: ''+event.body,
  //           });
  //           break;
  //           //Si hubo un error interno del servidor
  //           case 500:
  //             iziToast.error();
  //             ({
  //               title: 'Error',
  //               message: ''+event.body,
  //             });
  //             break;
  //           //si no hubier codigo de respuesta mostramos lo que viene
  //           default:
  //             iziToast.info({
  //               title: 'Info',
  //               message: ''+event.body,
  //           });
  //             break;
  //         }
  //        }
  //        },
  //        (error) =>{
  //            console.error('No connection to Server')
  //            iziToast.error({
  //               title: 'Error',
  //               message: 'No connection to Server',
  //           });
  //           }
  //        );
  } 

}
