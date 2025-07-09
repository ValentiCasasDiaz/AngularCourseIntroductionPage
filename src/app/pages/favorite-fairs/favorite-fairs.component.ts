import { Component, inject, OnInit } from '@angular/core';
import { FairsService } from '../../services/fairs.service';
import { Fair } from '../../models/fair.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-fairs',
  imports: [],
  templateUrl: './favorite-fairs.component.html',
  styleUrl: './favorite-fairs.component.css'
})
export class FavoriteFairsComponent implements OnInit {

  fairsService = inject(FairsService);
  router = inject(Router);

  favorites: Fair[] = [];

  ngOnInit() {
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

  getStartDate(fair: Fair): string {
   return new Date(fair.iniDate).toLocaleString();
  }

  getEndDate(fair: Fair): string {
    return new Date(fair.endDate).toLocaleString();
  }

   goToFairDetails(value: Fair): void {    
    this.router.navigate(['/',value.activityId]);
  }


}
