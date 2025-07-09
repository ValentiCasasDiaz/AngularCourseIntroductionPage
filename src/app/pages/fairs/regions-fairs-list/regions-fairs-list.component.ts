import { Component, inject, OnInit, output } from '@angular/core';
import { FairsService } from '../../../services/fairs.service';
import { Fair } from '../../../models/fair.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regions-fairs-list',
  imports: [AsyncPipe],
  templateUrl: './regions-fairs-list.component.html',
  styleUrl: './regions-fairs-list.component.css'
})
export class RegionsFairsListComponent implements OnInit {

  fairPressed = output<Fair>();

  router = inject(Router);
  fairsService = inject(FairsService);

  fairs$!: Observable<Fair[]>;

  currentRegion: string = '';
  favorites: Fair[] = [];

  ngOnInit(): void {

    this.fairsService.getCurrentRegion().subscribe((value: string) => {
      this.currentRegion = value;
      this.fairs$ = this.fairsService.getFairsByRegionName(value);
    });

    this.favorites = this.fairsService.loadFavorites();
  }

  onFairPressed(value: Fair, event: any) {
    const checked: boolean = event.srcElement.checked;

    if (checked) {
      this.fairsService.addFavorite(value);
    }
    else {
      this.fairsService.removeFavorite(value);
    }
    this.favorites = this.fairsService.loadFavorites();
  }

  // Check all checkboxes that belong to favorites
  getValueCheckedFor(value: Fair): boolean {
    let fair = this.favorites.find((fair: Fair) => {
      return value.activityId === fair.activityId;
    });

    return (fair) ? true : false;
  }

  goToFairDetails(value: Fair): void {    
    this.router.navigate(['/',value.activityId]);
  }

}
