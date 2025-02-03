import { Component, forwardRef, Input } from '@angular/core';
import { ComboboxItemConfig } from './types';
import { FormFieldBaseComponent } from '../form-field-base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-combobox',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true,
    }
  ],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss'
})
export class ComboboxComponent<T> extends FormFieldBaseComponent<T> {

  @Input() set items(items: ComboboxItemConfig<T>[]) {
    this._items = items
  }

  private _items: ComboboxItemConfig<T>[]

  get items(): ComboboxItemConfig<T>[] {
    return this._items
  }
}
