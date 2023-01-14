import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NwpassComponent } from './nwpass.component';

describe('NwpassComponent', () => {
  let component: NwpassComponent;
  let fixture: ComponentFixture<NwpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NwpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NwpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
