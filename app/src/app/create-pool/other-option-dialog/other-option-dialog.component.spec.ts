import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherOptionDialogComponent } from './other-option-dialog.component';

describe('OtherOptionDialogComponent', () => {
  let component: OtherOptionDialogComponent;
  let fixture: ComponentFixture<OtherOptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherOptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherOptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
