import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {
  @Input() item:any;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
