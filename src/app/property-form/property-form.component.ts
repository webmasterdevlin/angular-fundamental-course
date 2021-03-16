import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../property/property.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css'],
})
export class PropertyFormComponent implements OnInit {
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.formBuilderInit();
  }

  get name() {
    return this.itemForm.get('name');
  }

  get location() {
    return this.itemForm.get('location');
  }

  handleSubmit() {
    // alert(JSON.stringify(this.itemForm.value, null, 2));
    this.propertyService
      .postProperty(this.itemForm.value)
      .pipe(map((res) => alert(JSON.stringify(res, null, 2))))
      .subscribe();
  }

  private formBuilderInit(): void {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
}
