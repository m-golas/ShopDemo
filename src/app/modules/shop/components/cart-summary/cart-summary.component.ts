import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummaryComponent {
  @Input() price: number;

  constructor() {}
}
