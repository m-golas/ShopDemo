import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-layout',
  templateUrl: './cart-layout.component.html',
  styleUrls: ['./cart-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'flex-container'}
})
export class CartLayoutComponent {
  @Input() amount: number;
  @Output() resetCart = new EventEmitter<boolean>();

  constructor() { }
}
