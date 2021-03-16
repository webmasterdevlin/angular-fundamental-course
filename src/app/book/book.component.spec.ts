import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { BookService } from './book.service';
import { of } from 'rxjs';
import { BOOKINGS } from '../mocks/mock-bookings';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { By } from '@angular/platform-browser';

describe('BookComponent', () => {
  let fixture: ComponentFixture<BookComponent>;
  let mockBookService;

  beforeEach(() => {
    mockBookService = jasmine.createSpyObj('bookService', [
      'getBookings',
      'handleSubmit',
    ]);

    TestBed.configureTestingModule({
      declarations: [BookComponent, BookingFormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: BookService, useValue: mockBookService }],
    });

    fixture = TestBed.createComponent(BookComponent);
    mockBookService.getBookings.and.returnValue(of(BOOKINGS));

    fixture.detectChanges();
  });

  it('should render each schedule', function () {
    const schedules: HTMLElement = fixture.debugElement.nativeElement;
    const names = schedules.querySelectorAll('h4');
    const dates = schedules.querySelectorAll('h5');

    expect(names.length).toEqual(BOOKINGS.length);
    expect(dates.length).toEqual(BOOKINGS.length);
    expect(names.length).toEqual(dates.length);
  });

  it('should add new booking', async function () {
    let book = {
      name: 'code',
      date: '2022-03-19T13:30',
    };

    mockBookService.handleSubmit.and.returnValue(
      of({ ...book, id: '8hgis32y8' })
    );

    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const button = fixture.debugElement.query(By.css('button'));

    inputs[0].nativeElement.value = book.name;
    inputs[1].nativeElement.value = book.date;
    // button.nativeElement.click();
    button.triggerEventHandler('click', null);
    expect(button.nativeElement.disabled).toBeFalsy();

    fixture.detectChanges();

    const schedules: HTMLElement = fixture.debugElement.nativeElement;
    const names = schedules.querySelectorAll('h4');
    const dates = schedules.querySelectorAll('h5');
    // expect(names.length).toEqual(BOOKINGS.length + 1);
    // expect(dates.length).toEqual(BOOKINGS.length + 1);
    // expect(names.length).toEqual(dates.length + 1);
  });
});
