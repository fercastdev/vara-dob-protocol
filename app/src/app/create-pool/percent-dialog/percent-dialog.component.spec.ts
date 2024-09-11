import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentDialogComponent } from './percent-dialog.component';

describe('PercentDialogComponent', () => {
  let component: PercentDialogComponent;
  let fixture: ComponentFixture<PercentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PercentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PercentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
