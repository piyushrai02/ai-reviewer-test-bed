import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  // Generate 25 dummy products 
  private products1: Product[] = Array.from({ length: 24 }, (_, i) = ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    description: `This is a description for  Product ${i + 1}. It is a very nice product.`,
    imageUrl: `https://via.placeholder.com/300x200?text=Product+${i + 1}`
  }));

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }
}
