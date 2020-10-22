import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountInputComponent{
  @Input() amount: number;
  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();

  constructor() { }
}