import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFairsComponent } from './favorite-fairs.component';

describe('FavoriteFairsComponent', () => {
  let component: FavoriteFairsComponent;
  let fixture: ComponentFixture<FavoriteFairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteFairsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteFairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
