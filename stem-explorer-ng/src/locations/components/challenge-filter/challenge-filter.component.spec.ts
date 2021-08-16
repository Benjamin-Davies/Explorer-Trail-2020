import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChallengeFilterComponent } from './challenge-filter.component';

describe('ChallengeFilterComponent', () => {
  let component: ChallengeFilterComponent;
  let fixture: ComponentFixture<ChallengeFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
