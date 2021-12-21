import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChallengeTitleComponent } from './challenge-title.component';

describe('ChallengeTitleComponent', () => {
  let component: ChallengeTitleComponent;
  let fixture: ComponentFixture<ChallengeTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
