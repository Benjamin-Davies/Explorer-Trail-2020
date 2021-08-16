import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnswerDialogComponent } from './answer-dialog.component';

describe('AnswerDialogComponent', () => {
  let component: AnswerDialogComponent;
  let fixture: ComponentFixture<AnswerDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
