import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FairsService } from '../../services/fairs.service';
import { Fair } from '../../models/fair.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-fair-detail',
  imports: [AsyncPipe],
  templateUrl: './fair-detail.component.html',
  styleUrl: './fair-detail.component.css'
})
export class FairDetailComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private fairsService = inject(FairsService);

  fair$!: Observable<Fair | undefined>;

  favorites: Fair[] = [];

  ngOnInit(): void {
    this.favorites = this.fairsService.loadFavorites();

    const fairID = this.activatedRoute.snapshot.params['id'];
    this.fair$ = this.fairsService.getFairByID(fairID);
  }

  stringDateToLocale(dateString: string): string {
    return new Date(dateString).toLocaleString();
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
}
