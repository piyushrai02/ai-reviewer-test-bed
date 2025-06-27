import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
})
export class UserProfileComponent implements OnInit {
  userData: any;
  userSub1: Subscription; // Declared but never unsubscribed

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userSub1 = this.dataService.getUserData().subscribe((data) => {
      this.userData = data;
    });
  }
}
