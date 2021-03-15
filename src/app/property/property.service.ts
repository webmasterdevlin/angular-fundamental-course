import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Property } from './property';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(environment.baseUrl + 'properties');
  }

  postProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(
      environment.baseUrl + 'properties',
      property
    );
  }
}
