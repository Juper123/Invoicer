import { Component, computed, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective } from "@angular/forms";
import { FormErrorMessages, FormFieldInputMask } from "./enums";
import { FormFieldInputType } from "./enums/form-field-input-type.enum";
import { TextFieldPlaceHolder } from "../text-field";

@Component({
    template: '',

})
export class FormFieldBaseComponent<T> implements OnInit {
    formGroup: FormGroup
    formControl: FormControl
    constructor(private rootFormGroup: FormGroupDirective) { }

    ngOnInit(): void {
        this.formGroup = this.rootFormGroup.control
        this.formControl = this.formGroup.controls[this.formControlName] as FormControl
    }
    @Input() label: string

    @Input() formControlName: string = ''
    @Input() placeholder: TextFieldPlaceHolder
    @Input('value') _value: T;
    @Input() required: boolean;
    @Input() inputType: FormFieldInputType = FormFieldInputType.String
    @Input() mask: FormFieldInputMask

    labelSignal = computed(() => this.label)
    formControlNameSignal = computed(() => this.formControlName)
    placeholderSignal = computed(() => this.placeholder)
    requiredSignal = computed(() => this.required)
    requiredMessage = computed(() => this.getErrorMessage())
    inputTypeSignal = computed(() => this.inputType)
    maskSignal = computed(() => this.getMask(this.mask))

    private getMask(mask: FormFieldInputMask): string | null {
        if (mask === FormFieldInputMask.Date) {
            return '00-00-0000'
        }
        return null
    }


    get value(): T {
        return this._value
    }

    set value(val: T) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    onChange = (val: T): T => val;
    onTouched = (): void => { };

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(value: T): void {
        if (this.value !== value) {
            this.value = value;
        }
    }

    private getErrorMessage(): FormErrorMessages | null {
        if (this.formControl.errors && this.formControl.errors['required']) {
            return FormErrorMessages.Required
        }

        return null
    }
}