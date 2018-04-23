import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastFilterComponent } from './forecast-filter.component';

describe('ForecastFilterComponent', () => {
  let component: ForecastFilterComponent;
  let fixture: ComponentFixture<ForecastFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
