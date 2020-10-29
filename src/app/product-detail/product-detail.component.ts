import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() productList: any;
  product: any;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params) => {
    //     this.product = this.productList[+params.get('productId')];
    //   }
    // );
    this.product = this.productList[+this.route.snapshot.paramMap.get('productId')];
  }

}
