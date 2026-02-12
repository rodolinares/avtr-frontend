import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  title: string;
  brand: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  discountedPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:3000/products';

  async listProducts(limit: number = 30, skip: number = 0) {
    const data = await fetch(`${this.url}?limit=${limit}&skip=${skip}`);
    const json = await data.json();
    return json?.products ?? [];
  }

  async retrieveProduct(id: number) {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
}
