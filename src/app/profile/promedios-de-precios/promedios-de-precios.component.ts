import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ControlDeOrdenesService } from 'src/app/services/control-de-ordenes.service';

@Component({
  selector: 'app-promedios-de-precios',
  templateUrl: './promedios-de-precios.component.html',
  styleUrls: ['./promedios-de-precios.component.css']
})
export class PromediosDePreciosComponent implements OnInit {
  results:any[]=[];
  loading:boolean=true;
  table:boolean=false;
  selectedProduct1:any;
  constructor(public auth0Service: AuthService, private cdo:ControlDeOrdenesService) { }

  ngOnInit(): void {
    this.auth0Service.user$.subscribe(
      x =>  {
            let data={
              'user_id':x['http://softland.comuser_id']
            };
        this.cdo.promedioDePrecios(data).subscribe(
          (data:any)=>{
              this.results=data;
              this.loading=false;
              this.table=true;
          },
          error=>{
          console.error();
          }
        );
      },
      error=>{
        console.error();
        }
    );
  }

}
