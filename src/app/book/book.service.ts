import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBoookings(): Observable<Book[]> {
    return this.http.get<Book[]>(environment.baseUrl + 'bookings');
  }

  postBooking(book: Book): Observable<Book> {
    return this.http.post<Book>(environment.baseUrl + 'bookings', book);
  }
}
