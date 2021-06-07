import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ControlDeOrdenesService } from '../services/control-de-ordenes.service';
declare var iziToast:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any;
  
  constructor(public auth0Service: AuthService, private cdo:ControlDeOrdenesService) { }

  ngOnInit(): void {

          /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
          this.auth0Service.user$.subscribe(
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
