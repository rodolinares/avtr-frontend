import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart.component',
  imports: [DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  cdr = inject(ChangeDetectorRef);

  cart: any = null;
  items: any[] = [];

  async ngOnInit() {
    const data = await this.cartService.getCart();
    this.cart = data.cart;
    this.items = data.items;
    this.cdr.detectChanges();
  }

  async removeItem(item: string) {
    const data = await this.cartService.removeFromCart(item);
    this.cart = data.cart;
    this.items = data.items;
    this.cdr.detectChanges();
  }
}
