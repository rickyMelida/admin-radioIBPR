import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAudiosComponent } from './lista-audios.component';

describe('ListaAudiosComponent', () => {
  let component: ListaAudiosComponent;
  let fixture: ComponentFixture<ListaAudiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAudiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
