import { Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormControlsType, FormGroups, GenericFormGroup } from '../models';
import { FormGroupTypes } from '../enums';
import { Customer } from '../models/types/customer.interface';
import { hasValue } from '../../../libs';
import { Invoice, InvoicesFormControls, SettingsFormControls } from '../components';
import { CustomersFormControls } from '../components/invoicer-customers/enums';
import { Settings } from '../models/types';


@Injectable({
    providedIn: 'root',
})
export class FormsService {

    private formGroups: FormGroups = {
        [FormGroupTypes.Customers]: {} as GenericFormGroup<FormControlsType<Customer>, Customer>,
        [FormGroupTypes.Settings]: {} as GenericFormGroup<FormControlsType<Settings>, Settings>,
        [FormGroupTypes.Invoices]: {} as GenericFormGroup<FormControlsType<Invoice>, Invoice>
    };

    constructor(private formBuilder: FormBuilder) { }

    setFormControls(formGroupName: keyof FormGroups, controls: any): void {
        this.formGroups[formGroupName] = this.buildFormGroup(controls);
    }

    getForm(formGroupName: keyof FormGroups) {
        return this.formGroups[formGroupName];
    }

    setFormValues<T>(model: T, formGroupType: FormGroupTypes): void {
        let controls = this.getForm(formGroupType).controls
        if (model && controls) {
            Object.keys(controls).forEach((control) => {
                this.setValue(formGroupType, control, model[control as keyof T])
            });
        }
    }

    resetForm(formGroupType: FormGroupTypes): void {
        this.getForm(formGroupType).reset()
    }

    formHasValue(formGroupType: FormGroupTypes): boolean {
        let formControls = this.getForm(formGroupType).controls as any
        let controlsType = this.getControlsType(formGroupType)

        return Object.keys(controlsType)
            .some(control => hasValue(formControls[control].value))
    }

    getFormValues<T>(formGroupType: FormGroupTypes): T {
        let formControls = this.getForm(formGroupType).controls as any
        let controlsType = this.getControlsType(formGroupType)
        let model = {} as any

        Object.keys(controlsType).forEach((property) => {
            model[property] = formControls[property].value
        });
        return Object.assign(model)
    }

    setValue<T = string>(formGroupName: keyof FormGroups, control: string, value: T, emitEvent = true): void {
        let formControl = this.formGroups[formGroupName].get(control) as FormControl
        formControl?.setValue(value, { emitEvent: emitEvent })
    }

    private buildFormGroup<T>(controls: any): GenericFormGroup<FormControlsType<T>, T> {
        return this.formBuilder.group({
            ...controls,
        },
        ) as GenericFormGroup<FormControlsType<T>, T>;
    }

    private getControlsType(formGroupType: FormGroupTypes): any {
        switch (formGroupType) {
            case FormGroupTypes.Invoices:
                return InvoicesFormControls

            case FormGroupTypes.Customers:
                return CustomersFormControls

            case FormGroupTypes.Settings:
                return SettingsFormControls

        }
    }
}