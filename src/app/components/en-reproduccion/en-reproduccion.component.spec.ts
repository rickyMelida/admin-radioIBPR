import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnReproduccionComponent } from './en-reproduccion.component';

describe('EnReproduccionComponent', () => {
  let component: EnReproduccionComponent;
  let fixture: ComponentFixture<EnReproduccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnReproduccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnReproduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
