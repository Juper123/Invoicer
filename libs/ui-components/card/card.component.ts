import { Component, Input } from '@angular/core';
import { CardConfig } from './types/card-config.interface';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() set cardConfig(value: CardConfig) {
    this._cardConfig = value
  }

  get cardConfig(): CardConfig {
    return this._cardConfig
  }

  private _cardConfig: CardConfig = { class: '' }
}
