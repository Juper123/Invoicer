import { Component, forwardRef } from '@angular/core';
import { FormFieldBaseComponent } from '../form-field-base';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    }
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent extends FormFieldBaseComponent<string> {

}
