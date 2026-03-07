import { Component, OnInit } from '@angular/core';
import { CardService } from './card.service';
import { Product } from './product.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];

  // Pagination State
  currentPage: number = 2;
  pageSize: number = 7;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getProducts().subscribe(data => {
      this.products = data;
      this.totalPages = Math.ceil(this.products.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePage();
    });
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page = 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }
}
