import { Component, OnInit } from '@angular/core';
import { Auth0Service } from 'src/app/services/auth0.service';
import { ControlDeOrdenesService } from 'src/app/services/control-de-ordenes.service';

declare var iziToast:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  

  constructor(public auth0Service: Auth0Service, private cdo:ControlDeOrdenesService) {

   }

  ngOnInit(): void {

      /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
      this.auth0Service.userProfile$.subscribe(
        x =>  {
          this.user={"user_id":x['http://softland.comuser_id']};
          this.cdo.isUserRegistered(this.user).subscribe(
            (data) => { // Success
              if(data=="false")
              {
                /*Nos suscribimos al observable del servicio cdo
                y le enviamos el objeto usuario logeado a nuestro servidor*/ 
                this.cdo.registrarVendedor(this.user).subscribe(
                  (data) => { // Success
                    iziToast.success({
                      title: 'OK',
                      message: ""+data,
                    });
                  },
                  (error) => {
                    console.error(error);
                  });
              }
            },
            (error) => {
              console.error(error);
            });
        },//obtenemos la fecha y se la pasamos a la variable created_at
        err => console.error('Observer got an error: ' + err),//si hay error
        () => console.log('Observer got a complete notification')//completo la notificacion del observer
      ); 


  }

}
