// ============================================================================
// File: bad-component.component.ts
// Description: This file contains multiple violations of the team's
//              Angular coding standards for testing purposes.
// ============================================================================

import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

// VIOLATION of Rule #3: "Service Injection Scope"
// This service is missing `providedIn: 'root'`, which can lead to
// multiple instances of the service and unexpected behavior.
@Injectable()
export class BadUserService {
  getUsers() { return []; }
@Injectable({ providedIn: 'root' })
export class BadUserService { ... }


// VIOLATION of Rule #1: "OnPush Change Detection"
// This component is using the default change detection strategy instead of OnPush,
// which can lead to performance issues.
@Component({
  selector: 'app-bad-component',
  templateUrl: './bad-component.component.html',
  // Missing: changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadComponent {
  // This is a placeholder property for the HTML template's ngFor loop
  items = [{id: 1, name: 'Test Item 1'}, {id: 2, name: 'Test Item 2'}];

  constructor() {}
}
```html
<!-- ============================================================================ -->
<!-- File: bad-component.component.html                                       -->
<!-- Description: This file contains a violation of the ngFor performance rule. -->
<!-- ============================================================================ -->

<h3>Items List</h3>

<!-- VIOLATION of Rule #2: "Use trackBy functions in ngFor loops" -->
<!-- This loop is inefficient because it will re-render the entire list -->
<!-- every time the 'items' array changes, even for a minor update. -->
<div *ngFor="let item of items">
  <span>{{ item.id }}</span> - <span>{{ item.name }}</span>
</div>