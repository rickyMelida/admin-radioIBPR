import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaledarioComponent } from './caledario.component';

describe('CaledarioComponent', () => {
  let component: CaledarioComponent;
  let fixture: ComponentFixture<CaledarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaledarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaledarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
