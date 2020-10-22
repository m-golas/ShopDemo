import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteButtonComponent {
  @Output() remove = new EventEmitter<any>();

  constructor() { }
}