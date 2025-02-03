import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonConfig } from '../sidebar';
import { ButtonType } from './enums';


@Component({
  selector: 'app-button',
  standalone: false,

  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Output() onClick = new EventEmitter();
  @Input() disabled: boolean
  @Input() isButtonSelected: boolean
  @Input() set buttonConfig(config: ButtonConfig) {
    this._buttonConfig = config
  }

  private _buttonConfig: ButtonConfig

  get buttonConfig(): ButtonConfig {
    return this._buttonConfig
  }

  get classes(): string {
    return this.buttonConfig?.classes as string
  }

  get buttonTypeRaised(): boolean {
    return this.buttonConfig?.type === ButtonType.Raised
  }

  get buttonTypeExtendedFab(): boolean {
    return this.buttonConfig?.type === ButtonType.ExtendedFab
  }

  onButtonClick(): void {
    if (!this.disabled) {
      this.onClick.emit()
    }
  }
}
