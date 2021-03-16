import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profiles = [];

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    // console.log('send');
    this.profileService.getProfiles().subscribe((data: any) => {
      this.profiles = data;
    });
  }
}
