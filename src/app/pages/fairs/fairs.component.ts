import { Component } from '@angular/core';
import { RegionsListComponent } from './regions-list/regions-list.component';
import { RegionsFairsListComponent } from './regions-fairs-list/regions-fairs-list.component';

@Component({
  selector: 'app-fairs',
  imports: [RegionsListComponent, RegionsFairsListComponent],
  templateUrl: './fairs.component.html',
  styleUrl: './fairs.component.css',
})
export class FairsComponent {

  
}
