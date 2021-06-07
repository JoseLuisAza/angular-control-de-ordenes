import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ControlDeOrdenesService } from 'src/app/services/control-de-ordenes.service';

@Component({
  selector: 'app-myitems',
  templateUrl: './myitems.component.html',
  styleUrls: ['./myitems.component.css']
})
export class MyitemsComponent implements OnInit {
  items:any[]=[];
  amountItems:number;
  loading:boolean=true;
  user:any;
  noData:boolean=false;
  constructor(private cdo:ControlDeOrdenesService, public auth0Service: AuthService ) { 


  }

  ngOnInit(): void {
            /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
            this.auth0Service.user$.subscribe(
              x =>  {
                this.user={"user_id":x['http://softland.comuser_id']};
                this.cdo.getArticulos(this.user).subscribe(
                  (data:any) => {
                    this.items=data;
                    this.loading=false;
                    if(data.length==0)
                    {
                      this.noData=true;
                    }
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

  buscar(item)
  {
    
  }

}
