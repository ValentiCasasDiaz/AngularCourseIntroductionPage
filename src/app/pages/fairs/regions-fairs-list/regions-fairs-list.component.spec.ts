import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsFairsListComponent } from './regions-fairs-list.component';

describe('RegionsFairsListComponent', () => {
  let component: RegionsFairsListComponent;
  let fixture: ComponentFixture<RegionsFairsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionsFairsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionsFairsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
