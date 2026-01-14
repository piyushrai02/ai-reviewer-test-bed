// greeting.component.ts

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-greeting", // How you'll use this component in other templates: <app-greeting></app-greeting>
  templateUrl: "./greeting.component.html", // Links to the HTML template
  styleUrls: ["./greeting.component.css"], // Links to component-specific CSS (optional)
})
export class GreetingComponent implements OnInit {
  // Properties (data) that can be displayed or manipulated
  title: string = "Welcome to Mycwdqw Angular 1 App check the  sdd wdww";
  userName: string = "Guest";
  initialUserName: string = "Guest"; // To store the initial state for reset
  showDetails: boolean = false;
  showDetails: boolean = false;

  // @Input() Decorator: Allows data to be passed into this component from its parent check the PR
  @Input()
  set defaultName(name: string) {
    if (name) {
      this.userName = name;
      this.initialUserName = name;
    }
  }

  // @Output() Decorator: Allows this component to emit events to its parent
  @Output() nameChanged = new EventEmitter<string>();
  @Output() detailsToggled = new EventEmitter<boolean>();

  constructor() {
    // Constructor is typically used for dependency injection (e.g., injecting services)
    // Avoid heavy logic here; use ngOnInit for initialization that depends on inputs
  }

  // Lifecycle Hook: Called once, after the component's data-bound properties are initialized.
  ngOnInit(): void {
    console.log("GreetingComponent initialized.");
    // You could fetch initial data here if needed
  }

  // Event Handlers (methods)
  onNameChange(): void {
    console.log("Name input changed to:", this.userName);
    // Emit the event to the parent component
    this.nameChanged.emit(this.userName);
  }

  resetName(): void {
    this.userName = this.initialUserName;
    this.nameChanged.emit(this.userName); // Emit after resetting
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
    this.detailsToggled.emit(this.showDetails); // Emit the new state
  }
}
