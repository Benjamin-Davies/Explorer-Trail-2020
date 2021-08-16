import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FeaturedLocationsComponent } from './featured-locations.component';

describe('FeaturedLocationsComponent', () => {
  let component: FeaturedLocationsComponent;
  let fixture: ComponentFixture<FeaturedLocationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
