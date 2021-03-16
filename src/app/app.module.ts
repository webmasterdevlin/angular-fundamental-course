import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { PropertyComponent } from './property/property.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PropertyFormComponent } from './property-form/property-form.component';
import { BookComponent } from './book/book.component';
import { BookingFormComponent } from './booking-form/booking-form.component';

@NgModule({
  declarations: [AppComponent, ProfileComponent, PropertyComponent, PropertyFormComponent, BookComponent, BookingFormComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
