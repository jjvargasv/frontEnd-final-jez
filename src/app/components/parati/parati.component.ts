import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/auth/interfaces/products.interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-parati',
  templateUrl: './parati.component.html',
  styleUrls: ['./parati.component.css']
})
export class ParatiComponent  implements OnInit {
  products: Products = { products: [] };
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProductByCategory('parati').subscribe((res) => {
      this.products.products = res;
    });
  }
}
