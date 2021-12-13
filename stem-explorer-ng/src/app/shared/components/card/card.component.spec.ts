import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChallengeListCardComponent } from '../../../../locations/components/challenge-list-card.component';

describe('CategoryCardComponent', () => {
  let component: ChallengeListCardComponent;
  let fixture: ComponentFixture<ChallengeListCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeListCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
