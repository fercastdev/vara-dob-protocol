import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineMobileChartComponent } from './line-mobile-chart.component';

describe('LineMobileChartComponent', () => {
  let component: LineMobileChartComponent;
  let fixture: ComponentFixture<LineMobileChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineMobileChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineMobileChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
