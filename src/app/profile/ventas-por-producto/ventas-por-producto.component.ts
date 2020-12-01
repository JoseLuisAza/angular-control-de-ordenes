import { Component, OnInit } from '@angular/core';
import { Auth0Service } from 'src/app/services/auth0.service';
import { ControlDeOrdenesService } from 'src/app/services/control-de-ordenes.service';

@Component({
  selector: 'app-ventas-por-producto',
  templateUrl: './ventas-por-producto.component.html',
  styleUrls: ['./ventas-por-producto.component.css']
})
export class VentasPorProductoComponent implements OnInit {
  results:any[]=[];
  loading:boolean=true;
  table:boolean=false;
  selectedProduct1:any;
  constructor(public auth0Service: Auth0Service, private cdo:ControlDeOrdenesService) { }

  ngOnInit(): void {
    this.auth0Service.userProfile$.subscribe(
      x =>  {
            let data={
              'user_id':x['http://softland.comuser_id']
            };
        this.cdo.ventasPorProducto(data).subscribe(
          (data:any)=>{
              console.log(data);
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
