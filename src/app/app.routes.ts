import { Routes } from '@angular/router';
import { FairsComponent } from './pages/fairs/fairs.component';
import { FavoriteFairsComponent } from './pages/favorite-fairs/favorite-fairs.component';
import { FairDetailComponent } from './pages/fair-detail/fair-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'fairs', pathMatch: 'full' },
  { path: 'fairs', title: 'Fairs', component: FairsComponent },
  { path: 'favorites', title: 'Favorites', component: FavoriteFairsComponent },
  { path: ':id', title: 'Fair Details', component: FairDetailComponent },
  { path: '**', redirectTo: 'fairs' }
];
