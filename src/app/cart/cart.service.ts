import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';
  private user = '698d034b02fe19e26724516e';

  constructor(private http: HttpClient) {}

  async addToCart(product: number, amount = 1) {
    const data = await fetch(`${this.apiUrl}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.user,
        product,
        amount,
      }),
    });

    return (await data.json()) ?? {};
  }

  getCart() {
    const data = fetch(`${this.apiUrl}/${this.user}`);
    return data.then((res) => res.json()) ?? {};
  }

  removeFromCart(itemId: string) {
    const data = fetch(`${this.apiUrl}/${this.user}/item/${itemId}`, {
      method: 'DELETE',
    });

    return data.then((res) => res.json()) ?? {};
  }
}
