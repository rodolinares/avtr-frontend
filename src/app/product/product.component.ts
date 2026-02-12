import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';

import { CartService } from '../cart/cart.service';
import { Product, ProductService } from './product.service';

@Component({
  selector: 'app-product.component',
  imports: [DecimalPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  cdr = inject(ChangeDetectorRef);

  products: Product[] = [];
  message: string = '';

  async ngOnInit() {
    this.products = await this.productService.listProducts();
    this.cdr.detectChanges();
  }

  async addToCart(product: number) {
    try {
      await this.cartService.addToCart(product);
      this.message = 'Producto agregado al carrito ✓';
      setTimeout(() => (this.message = ''), 2000);
      this.cdr.detectChanges();
    } catch (error) {
      this.message = 'Error al agregar producto';
    }
  }
}
