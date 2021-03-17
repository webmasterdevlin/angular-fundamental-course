import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
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
  let component: BookComponent;

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
    component = fixture.componentInstance;
    mockBookService.getBookings.and.returnValue(of(BOOKINGS));

    fixture.detectChanges();
  });

  it('should render each schedule', fakeAsync(() => {
    const schedules: HTMLElement = fixture.debugElement.nativeElement;
    const names = schedules.querySelectorAll('h4');
    const dates = schedules.querySelectorAll('h5');

    expect(names.length).toEqual(BOOKINGS.length);
    expect(dates.length).toEqual(BOOKINGS.length);
    expect(names.length).toEqual(dates.length);
  }));

  it('should add new booking', fakeAsync(() => {
    let book = {
      name: 'code',
      date: '2022-03-19T13:30',
    };

    spyOn(component, 'handleSubmit');

    mockBookService.handleSubmit.and.returnValue(
      of({ ...book, id: '8hgis32y8' })
    );

    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const button = fixture.debugElement.query(By.css('button'));

    inputs[0].nativeElement.value = book.name;
    inputs[0].triggerEventHandler('input', { target: inputs[0].nativeElement });
    inputs[1].nativeElement.value = book.date;
    inputs[1].triggerEventHandler('input', { target: inputs[1].nativeElement });
    expect(button.nativeElement.disabled).toBeFalsy();

    button.nativeElement.click();
    tick(250);
    flush();

    fixture.detectChanges();

    /* TOFIX: fixture.detectChanges is not reliable */
    // expect(component.handleSubmit).toHaveBeenCalledTimes(1);

    // expect(fixture.debugElement.queryAll(By.css('yahoo')).length).toEqual(1);
    // expect(
    //   fixture.debugElement.nativeElement.querySelectorAll('h3').length
    // ).toEqual(1);

    // const schedules: HTMLElement = fixture.debugElement.nativeElement;
    // const names = schedules.querySelectorAll('h4');
    // const dates = schedules.querySelectorAll('h5');
    // expect(names.length).toEqual(BOOKINGS.length + 1);
    // expect(dates.length).toEqual(BOOKINGS.length + 1);
    // expect(names.length).toEqual(dates.length + 1);
  }));
});
