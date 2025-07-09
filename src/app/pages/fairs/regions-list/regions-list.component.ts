import { Component, inject, OnInit, output } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FairsService } from '../../../services/fairs.service';

@Component({
  selector: 'app-regions-list',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './regions-list.component.html',
  styleUrl: './regions-list.component.css'
})
export class RegionsListComponent implements OnInit {

  fairsService = inject(FairsService);
  regionNames$!: Observable<string[]>;

  ngOnInit(): void {
    this.regionNames$ = this.fairsService.getRegionNames();
  }

  // Event when the region is pressed
  onRegionPressed(value: string) {
    this.fairsService.updateCurrentRegion(value);
  }

}
