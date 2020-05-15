import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPorDiaComponent } from './audio-por-dia.component';

describe('AudioPorDiaComponent', () => {
  let component: AudioPorDiaComponent;
  let fixture: ComponentFixture<AudioPorDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPorDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPorDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
