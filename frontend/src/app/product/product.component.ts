import {Component, computed, effect, inject, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {toSignal} from "@angular/core/rxjs-interop";
import {DecimalPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute} from "@angular/router";


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    DecimalPipe,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  // Writable signal: quantity
  quantity = signal(1);
  // Get productId from the route params
  productId = Number(this.route.snapshot.paramMap.get('id'));
  // Fetch product data using the ID from the URL
  productSignal = toSignal(
    this.http.get<Product>(`https://fakestoreapi.com/products/${this.productId}`),
    { initialValue: undefined }
  );
  // Computed: total = product price × quantity
  totalPrice = computed(() => {
    const product = this.productSignal();
    return product ? product.price * this.quantity() : 0;
  });


  constructor() {
    // Effect to log changes
    effect(() => {
      console.log('🧾 New total price:', this.totalPrice());
      this.getUsers();
    }, { allowSignalWrites: true });
  }

  getUsers() {

  }
  increment() {
    this.quantity.set(this.quantity() + 1);
  }

  decrement() {
    if (this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }
}
