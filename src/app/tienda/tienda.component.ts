import { Component, OnInit } from '@angular/core';
import { ControlDeOrdenesService } from '../services/control-de-ordenes.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  items:any[]=[];
  loading:boolean=true;
  constructor(private cdo:ControlDeOrdenesService ) { 
  
    this.cdo.getArticulos().subscribe(
      (data:any)=>{
          this.items=data;
          this.loading=false;
      },
      error =>{
        console.error(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
