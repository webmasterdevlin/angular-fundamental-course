import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from './book.service';
import { map } from 'rxjs/operators';
import { Book } from './book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  itemForm: FormGroup;
  bookings: Book[] = [];
  show = false;

  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.formBuilderInit();
    this.bookService
      .getBookings()
      .pipe(map((res) => (this.bookings = res)))
      .subscribe();
  }

  handleSubmit() {
    this.show = true;
    // alert(JSON.stringify(this.itemForm.value, null, 2));
    this.bookService
      .postBooking(this.itemForm.value)
      .pipe(map((res) => this.bookings.push(res)))
      .subscribe();
  }

  readableSchedule(date: Date) {
    const newDate = new Date(date);
    return `${newDate.getMonth()}/${newDate.getDay()}/${newDate.getFullYear()} at ${newDate.getHours()}:${newDate.getMinutes()}`;
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      name: [''],
      date: [''],
    });
  }
}
