import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  // apiLoaded: Observable<boolean>;
  showDropdown: boolean = false;
  center = { lat: 31.256065, lng: 32.31249 };
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 31.256065, lng: 32.31249 },
  ];

  cities = [
    {
      name: 'Port Said',
      coords: {
        lat: 31.256065,
        lng: 32.31249,
      },
    },
    {
      name: 'Cairo',
      coords: {
        lat: 30.0444,
        lng: 31.2357,
      },
    },
    {
      name: 'Mansoura',
      coords: {
        lat: 31.0409,
        lng: 31.3785,
      },
    },
  ];
  constructor(httpClient: HttpClient) {}

  mapClick(e: any) {
    console.log(e.latLng.lat());

    this.center = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    this.markerPositions = [
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ];
  }

  handlebuttonclick() {
    this.showDropdown = !this.showDropdown;
  }

  handleCityClick(coords: any) {
    console.log(coords);
    this.center = coords;
    this.markerPositions = [coords];
    this.showDropdown = false;
  }
}
