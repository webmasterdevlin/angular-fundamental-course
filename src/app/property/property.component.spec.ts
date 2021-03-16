import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { PropertyComponent } from './property.component';
import { PropertyService } from './property.service';
import { PROPERTIES } from '../mocks/mock-properties';

describe('PropertyComponent', () => {
  let component: PropertyComponent;
  let fixture: ComponentFixture<PropertyComponent>;

  beforeEach(
    waitForAsync(() => {
      const svcSpy = jasmine.createSpyObj<PropertyService>(['getProperties']);
      svcSpy.getProperties.and.returnValue(of(PROPERTIES));

      TestBed.configureTestingModule({
        declarations: [PropertyComponent],
        providers: [{ provide: PropertyService, useValue: svcSpy }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', function () {
    expect(component).toBeTruthy();
  });

  it('should create profiles', function () {
    expect(component.properties.length).toEqual(2);

    const names = fixture.debugElement.queryAll(By.css('.paragraph'));
    expect(names.length).toEqual(2);

    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('p').length).toEqual(2);
  });
});
