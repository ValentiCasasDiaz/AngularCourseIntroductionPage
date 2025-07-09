import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Fair } from '../models/fair.model';

@Injectable({
  providedIn: 'root'
})
export class FairsService {

  private favoriteKey = 'favorites';
  private jsonUrl = 'fairs.json'; // Ruta al JSON local

  private currentRegion = new BehaviorSubject(''); // Nom de la Regió actual seleccionada per l'usuari

  constructor(private http: HttpClient) {}

  getRegionNames(): Observable<string[]> {
    return this.http.get<Fair[]>(this.jsonUrl).pipe(
      map((value: Fair[]) => {

        // We get all the region names
        const allRegionNames = value.map((value: any) => value.regionName);   

        // We remove the duplicates
        let regionNames = allRegionNames.filter((value, index) => allRegionNames.indexOf(value) === index);

        // Sort by name
        return regionNames.sort();
      })
    );
  }

  getCurrentRegion(): Observable<string> {
    return this.currentRegion.asObservable();
  }

  updateCurrentRegion(regionName: string) {
     this.currentRegion.next(regionName);    
  }

  getFairsByRegionName(name: string): Observable<Fair[]> {   
    return this.http.get<Fair[]>(this.jsonUrl).pipe(
      map((values: Fair[]) => { 
        return values.filter((value: Fair) => value.regionName === name);
      })
    );
  }

  getFairByID(id: string): Observable<Fair | undefined> {
    return this.http.get<Fair[]>(this.jsonUrl).pipe(
      map((values: Fair[]) => { 
        return values.find((value: Fair) => value.activityId === id);
      })
    );
  }

  addFavorite(fair: Fair) {
    let favoriteFairs: Fair[] = this.loadFavorites();
    
    // Avoid adding a fair that is already on the list
    let idx = favoriteFairs.findIndex(
      (value) => value.activityName === fair.activityName
    );

    if (idx == -1) {
      favoriteFairs.push(fair);
    }

    this.saveFavorites(favoriteFairs);
  }

  removeFavorite(fair: Fair) {
    let favoriteFairs: Fair[] = this.loadFavorites();
    
    let idx = favoriteFairs.findIndex(
      (value) => value.activityName === fair.activityName
    );

    if (idx != -1) {
      favoriteFairs.splice(idx, 1);
    }

    this.saveFavorites(favoriteFairs);
  }

  loadFavorites(): Fair[] {
    const favoritesJSON = localStorage.getItem(this.favoriteKey);

    if (favoritesJSON) {
      return JSON.parse(favoritesJSON);
    }
    else {
      return [];
    }
  }

  saveFavorites(fairs: Fair[]) {
    localStorage.setItem(this.favoriteKey, JSON.stringify(fairs));
  }

}
