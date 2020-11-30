import { Component, Input, OnInit } from '@angular/core';
import { ControlDeOrdenesService } from '../services/control-de-ordenes.service';

declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  @Input() item:any;
  showModal:boolean=false;
  constructor(private cdo:ControlDeOrdenesService) { 
    
  }

  ngOnInit(): void {
    
     
  }


  public comprar(cantidad)
  {
    this.cdo.agregarCarrito(this.item,cantidad).subscribe(
      (data:string)=>{
        iziToast.success({
          title: 'OK',
          message: ""+data,
        });
        this.showModal=false;
      },
      error=>{
        console.error(error);
      }
    );
  }

}
