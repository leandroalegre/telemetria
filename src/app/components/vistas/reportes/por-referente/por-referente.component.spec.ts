import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorReferenteComponent } from './por-referente.component';

describe('PorReferenteComponent', () => {
  let component: PorReferenteComponent;
  let fixture: ComponentFixture<PorReferenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorReferenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorReferenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
