import { Component, OnInit } from '@angular/core';
import { Auth0Service } from '../services/auth0.service';
import { ControlDeOrdenesService } from '../services/control-de-ordenes.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  items:any[]=[];
  loading:boolean=true;
  user:any;
  constructor(private cdo:ControlDeOrdenesService, public auth0Service: Auth0Service) { 


  }

  ngOnInit(): void {
        /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
        this.auth0Service.userProfile$.subscribe(
          x =>  {
            this.user={"user_id":x['http://softland.comuser_id']};
            this.cdo.getArticulosGeneral(this.user).subscribe(
              (data:any) => {
                this.items=data;
                this.loading=false;
              },
              (error) => {
                console.error(error)
              },//si hay error
            );
          },//obtenemos la fecha y se la pasamos a la variable created_at
          err => console.error('Observer got an error: ' + err),//si hay error
          () => console.log('Observer got a complete notification')//completo la notificacion del observer
        );
  }

}
