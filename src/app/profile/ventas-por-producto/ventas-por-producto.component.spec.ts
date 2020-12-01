import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasPorProductoComponent } from './ventas-por-producto.component';

describe('VentasPorProductoComponent', () => {
  let component: VentasPorProductoComponent;
  let fixture: ComponentFixture<VentasPorProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasPorProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasPorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
