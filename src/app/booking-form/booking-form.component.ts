import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent {
  @Input() itemForm: FormGroup | any;

  @Output() handleSubmit = new EventEmitter<void>();

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  onSubmit() {
    this.handleSubmit.emit();
    this.formGroupDirective.resetForm();
  }

  get name() {
    return this.itemForm.get('name');
  }

  get date() {
    return this.itemForm.get('date');
  }
}
