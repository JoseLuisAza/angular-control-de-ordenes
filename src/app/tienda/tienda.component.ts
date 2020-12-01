import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Auth0Service } from '../services/auth0.service';
import { ControlDeOrdenesService } from '../services/control-de-ordenes.service';

declare var iziToast:any;

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  items:any[]=[];
  loading:boolean=true;
  user:any;
  totalProductosComprados:number;
  noData:boolean=false;
  showModalShop:boolean=false;
  itemsShop:any[]=[];
  products: any[];
  selectedProduct1: any;
  constructor(private cdo:ControlDeOrdenesService, public auth0Service: Auth0Service) { 


  }

  ngOnInit(): void {

        setTimeout(() => {
          if(!this.auth0Service.loggedIn)
          {
            this.cdo.getArticulosStore().subscribe(
              (data:any) => {
                this.items=data;
                this.loading=false;
                if(data.length==0)
                {
                  this.noData=true;
                }
                this.cdo.getTotalCarrito().subscribe(
                  (data:any) => {
                    this.totalProductosComprados=data;
                  },
                  (error) => {
                    console.error(error)
                  },//si hay error
                );
              },
              (error) => {
                console.error(error)
              },//si hay error
            );
          }else{
          /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
          this.auth0Service.userProfile$.subscribe(
            x =>  {
              this.user={"user_id":x['http://softland.comuser_id']};
              this.cdo.getArticulosGeneral(this.user).subscribe(
                (data:any) => {
                  this.items=data;
                  this.loading=false;       
                  if(data.length==0)
                  {
                    this.noData=true;
                  }
                  this.cdo.getTotalCarrito().subscribe(
                    (data:any) => {
                      this.totalProductosComprados=data;
                    },
                    (error) => {
                      console.error(error)
                    },//si hay error
                  );         
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
        }, 3000);

  }

  public listShop()
  {

    this.cdo.getItemsCarrito().subscribe(
      (data:any) => {
        this.itemsShop=data;
        this.products=data;
        console.log(this.itemsShop);
        if(data.length>=1)
        {
          this.showModalShop=true;
        }
        else{
          iziToast.warning({
            title: 'warning',
            message: 'No hay articulos en el carrito!',
          });
        }

      },
      (error) => {
        console.error(error)
      },//si hay error
    );         
  }

  public finalizarCompra()
  {
    let data;
    let total=0;
    this.products.forEach(product => {
      this.items.forEach(items => {
        if(items.idproducto==product.idproducto)
        {
          let subtotal=product.cantidad*items.precio;
          total=total+subtotal;
        }
      });
    });
    /*Nos suscribimos al userProfile para obtener la fecha en que se registro el usuario*/
    this.auth0Service.userProfile$.subscribe(
      x =>  {
        data={
          'total':total,
          'user_id':x['http://softland.comuser_id']
        };
        this.cdo.finalizarCompra(data).subscribe(
          (data:any) => {
            if(data['affectedRows']>=1)
            {
              let dataVentaDetalletotal=[];
              this.products.forEach(product => {
                this.items.forEach(items => {
                  if(items.idproducto==product.idproducto)
                  {
                    let subtotal=product.cantidad*items.precio;
                    let dataVentaDetalle={
                      'idproducto':product.idproducto,
                      'idventa':data['insertId'],
                      'cantidad':product.cantidad,
                      'subtotal':subtotal
                    }
                    dataVentaDetalletotal.push(dataVentaDetalle);
                  }
                });
              });
              this.cdo.finalizarCompra2(dataVentaDetalletotal).subscribe(
                (data)=>{
                  let con:number=+data;
                  if(con==this.products.length)
                  {
                      this.cdo.clarItemsCarrito().subscribe(
                        (data:any) => {
                            //Mostramos un mensaje
                            iziToast.success({
                              title: 'success',
                              message: 'Compra hecha!',
                            });
                
                            //ocultamos el modal
                            this.showModalShop=false;
                        },
                        (error) => {
                          console.error(error)
                        },//si hay error
                      );
                  }
                  else
                  {
                    iziToast.error({
                      title: 'error',
                      message: 'Hubo un error.. No completo la compra',
                    });
                  }

                }
              );      
            }
            else
            {
              //si no fue afectada ninguna fila en la base de datos
              //mostramos un mensaje
              iziToast.error({
                title: 'error',
                message: 'Hubo un error.. No completo la compra',
              });
            }
          },
          (error) => {
            console.error(error)
          },//si hay error
        ); 

      },//obtenemos la fecha y se la pasamos a la variable created_at
      error => console.error(error),//si hay error
    ); 

 
 
    
  }

  public eliminarArticulos()
  {
    this.cdo.clarItemsCarrito().subscribe(
      (data:any) => {
          //Mostramos un mensaje
          iziToast.success({
            title: 'success',
            message: 'Articulos eliminados!',
          });

          //ocultamos el modal
          this.showModalShop=false;
      },
      (error) => {
        console.error(error)
      },//si hay error
    );
  }

}
