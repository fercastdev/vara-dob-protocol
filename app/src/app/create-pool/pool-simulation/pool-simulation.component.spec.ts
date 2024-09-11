import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolSimulationComponent } from './pool-simulation.component';

describe('PoolSimulationComponent', () => {
  let component: PoolSimulationComponent;
  let fixture: ComponentFixture<PoolSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolSimulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
