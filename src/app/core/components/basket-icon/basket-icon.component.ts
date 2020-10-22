import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basket-icon',
  templateUrl: './basket-icon.component.html',
  styleUrls: ['./basket-icon.component.scss']
})
export class BasketIconComponent {
  @Input() amount: number;

  constructor() { }
}