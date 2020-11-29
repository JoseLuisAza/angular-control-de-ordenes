import { Component, OnInit } from '@angular/core';
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
  constructor(private cdo:ControlDeOrdenesService ) { 
    this.cdo.getArticulos().subscribe(
      (data:any) => {
        this.items=data;
        this.loading=false;
      },
      (error) => {
        console.error(error)
      },//si hay error
    );
  }

  ngOnInit(): void {
  }

  buscar(item)
  {
    
  }

}
