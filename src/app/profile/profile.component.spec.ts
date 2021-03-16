import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import { By } from '@angular/platform-browser';
import { PROFILES } from '../mocks/mock-profiles';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(
    waitForAsync(() => {
      const svcSpy = jasmine.createSpyObj<ProfileService>(['getProfiles']);
      svcSpy.getProfiles.and.returnValue(of(PROFILES));

      TestBed.configureTestingModule({
        declarations: [ProfileComponent],
        providers: [{ provide: ProfileService, useValue: svcSpy }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create component', function () {
    expect(component).toBeTruthy();
  });

  it('should create profiles', function () {
    expect(component.profiles.length).toEqual(2);

    const names = fixture.debugElement.queryAll(By.css('.paragraph'));
    expect(names.length).toEqual(2);

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('p').length).toEqual(2);
  });
});
