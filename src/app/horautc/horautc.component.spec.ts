import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorautcComponent } from './horautc.component';

describe('HorautcComponent', () => {
  let component: HorautcComponent;
  let fixture: ComponentFixture<HorautcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorautcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorautcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
