import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChallengeProgressComponent } from './challenge-progress.component';

describe('ChallengeProgressComponent', () => {
  let component: ChallengeProgressComponent;
  let fixture: ComponentFixture<ChallengeDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
