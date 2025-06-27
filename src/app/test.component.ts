import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
})
export class UserProfileComponent implements OnInit {
  userData: any;
  userSub: Subscription; // Declared but never unsubscribed

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.userSub = this.dataService.getUserData().subscribe((data) => {
      this.userData = data;
    });
  }
}
