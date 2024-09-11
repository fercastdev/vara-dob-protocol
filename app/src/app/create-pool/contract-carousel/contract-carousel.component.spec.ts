import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCarouselComponent } from './contract-carousel.component';

describe('ContractCarouselComponent', () => {
  let component: ContractCarouselComponent;
  let fixture: ComponentFixture<ContractCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
