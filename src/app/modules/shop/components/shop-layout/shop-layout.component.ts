import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': 'flex-container'}
})
export class ShopLayoutComponent {
  @Input() open: boolean;
  @Output() switchMenu = new EventEmitter<boolean>();

  constructor() { }
}
