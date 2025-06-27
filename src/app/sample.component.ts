import { Component, Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

// VIOLATION: Missing changeDetection: ChangeDetectionStrategy.OnPush
@Component({
  selector: "app-user-list",
  template: `
    <div class="user-container">
      <h2>User Management</h2>

      <!-- VIOLATION: Missing trackBy function -->
      <div *ngFor="let user of users" class="user-card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button (click)="deleteUser(user.id)">Delete</button>
      </div>

      <!-- VIOLATION: Missing trackBy function -->
      <ul *ngFor="let role of userRoles">
        <li>{{ role.name }}</li>
      </ul>

      <button (click)="loadUsers()">Refresh Users</button>
    </div>
  `,
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  users: any[] = []; // VIOLATION: Using 'any' type
  userRoles: any; // VIOLATION: Using 'any' type
  private subscription: any; // VIOLATION: Using 'any' type

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();

    // VIOLATION: Subscribe without implementing OnDestroy
    this.subscription = this.userService.getUsers().subscribe((data: any) => {
      // VIOLATION: Using 'any' type
      this.users = data;
    });

    // VIOLATION: Another subscription without proper cleanup
    this.http.get("/api/roles").subscribe((roles) => {
      this.userRoles = roles;
    });
  }

  loadUsers() {
    // VIOLATION: Subscribe without proper error handling or cleanup
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id: any) {
    // VIOLATION: Using 'any' type for parameter
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}

// VIOLATION: Missing providedIn: 'root'
@Injectable()
export class UserService {
  private apiUrl = "/api/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    // VIOLATION: Using 'any' as return type
    return this.http.get<any>(this.apiUrl); // VIOLATION: Using 'any' as generic type
  }

  deleteUser(id: any): Observable<any> {
    // VIOLATION: Using 'any' for both parameter and return type
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateUser(user: any): Observable<any> {
    // VIOLATION: Using 'any' types
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user);
  }
}

// Another component with violations
// VIOLATION: Missing changeDetection: ChangeDetectionStrategy.OnPush
@Component({
  selector: "app-product-grid",
  template: `
    <div class="products">
      <!-- VIOLATION: Missing trackBy function -->
      <div *ngFor="let product of products" class="product-item">
        <img [src]="product.image" [alt]="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price | currency }}</p>

        <!-- VIOLATION: Missing trackBy function for nested loop -->
        <div *ngFor="let tag of product.tags" class="tag">
          {{ tag }}
        </div>
      </div>
    </div>
  `,
})
export class ProductGridComponent implements OnInit {
  products: any[] = []; // VIOLATION: Using 'any' type

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // VIOLATION: Subscribe without implementing OnDestroy
    this.productService.getProducts().subscribe(
      (data: any) => {
        // VIOLATION: Using 'any' type
        this.products = data;
      },
      (error: any) => {
        // VIOLATION: Using 'any' type
        console.error("Error loading products:", error);
      }
    );
  }
}

// VIOLATION: Missing providedIn: 'root'
@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    // VIOLATION: Using 'any' as return type
    return this.http.get<any>("/api/products");
  }
}

// Additional component with more violations
// VIOLATION: Missing changeDetection: ChangeDetectionStrategy.OnPush
@Component({
  selector: "app-dashboard",
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>

      <!-- VIOLATION: Missing trackBy -->
      <div *ngFor="let widget of widgets" class="widget">
        <h3>{{ widget.title }}</h3>
        <div [innerHTML]="widget.content"></div>
        <!-- VIOLATION: Using innerHTML -->
      </div>

      <!-- VIOLATION: Missing trackBy -->
      <ul *ngFor="let notification of notifications">
        <li>{{ notification.message }}</li>
      </ul>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  widgets: any[] = []; // VIOLATION: Using 'any' type
  notifications: any[] = []; // VIOLATION: Using 'any' type

  constructor(
    private widgetService: WidgetService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    // VIOLATION: Multiple subscriptions without OnDestroy implementation
    this.widgetService.getWidgets().subscribe((widgets: any) => {
      this.widgets = widgets;
    });

    this.notificationService
      .getNotifications()
      .subscribe((notifications: any) => {
        this.notifications = notifications;
      });
  }
}

// VIOLATION: Missing providedIn: 'root'
@Injectable()
export class WidgetService {
  getWidgets(): Observable<any> {
    // VIOLATION: Using 'any' return type
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

// VIOLATION: Missing providedIn: 'root'
@Injectable()
export class NotificationService {
  getNotifications(): Observable<any> {
    // VIOLATION: Using 'any' return type
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}
