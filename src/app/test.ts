import { Component, Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-user-list",
  template: `
    <div class="user-container">
      <h2>User Management</h2>

      <div *ngFor="let user of users" class="user-card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button (click)="deleteUser(user.id)">Delete</button>
      </div>

      <ul *ngFor="let role of userRoles">
        <li>{{ role.name }}</li>
      </ul>

      <button (click)="loadUsers()">Refresh Users</button>
    </div>
  `,
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  userRoles: any;
  private subscription: any;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();

    this.subscription = this.userService.getUsers().subscribe((data: any) => {
      this.users = data;
    });

    this.http.get("/api/roles").subscribe((roles) => {
      this.userRoles = roles;
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}

@Injectable()
export class UserService {
  private apiUrl = "/api/users";

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user);
  }
}

@Component({
  selector: "app-product-grid",
  template: `
    <div class="products">
      <div *ngFor="let product of products" class="product-item">
        <img [src]="product.image" [alt]="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price | currency }}</p>

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
    this.productService.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => {
        console.error("Error loading products:", error);
      }
    );
  }
}

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

      <div *ngFor="let widget of widgets" class="widget">
        <h3>{{ widget.title }}</h3>
        <div [innerHTML]="widget.content"></div>
        <!-- VIOLATION: Using innerHTML -->
      </div>

      <ul *ngFor="let notification of notifications">
        <li>{{ notification.message }}</li>
      </ul>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  widgets: any[] = [];
  notifications: any[] = [];

  constructor(
    private widgetService: WidgetService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
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

@Injectable()
export class WidgetService {
  getWidgets(): Observable<any> {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}

@Injectable()
export class NotificationService {
  getNotifications(): Observable<any> {
    return new Observable((observer) => {
      observer.next([]);
    });
  }
}
