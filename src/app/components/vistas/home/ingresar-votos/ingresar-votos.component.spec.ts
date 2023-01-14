import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarVotosComponent } from './ingresar-votos.component';

describe('IngresarVotosComponent', () => {
  let component: IngresarVotosComponent;
  let fixture: ComponentFixture<IngresarVotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarVotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarVotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
