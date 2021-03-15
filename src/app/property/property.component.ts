import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Property } from './property';
import { PropertyService } from './property.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css'],
})
export class PropertyComponent implements OnInit {
  properties: Property[] = [];

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.fetchProperties();
  }

  fetchProperties() {
    this.propertyService
      .getProperties()
      .pipe(
        map((res) => (this.properties = res)),
        catchError((e) => {
          console.log(e);
          return of([]);
        })
      )
      .subscribe();
  }
}
