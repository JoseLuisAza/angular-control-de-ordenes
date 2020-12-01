import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromediosDePreciosComponent } from './promedios-de-precios.component';

describe('PromediosDePreciosComponent', () => {
  let component: PromediosDePreciosComponent;
  let fixture: ComponentFixture<PromediosDePreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromediosDePreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromediosDePreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
