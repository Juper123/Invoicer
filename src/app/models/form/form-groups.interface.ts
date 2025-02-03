import { Invoice } from "../../components";
import { Customer } from "../types/customer.interface";
import { FormGroupTypes } from "../../enums";
import { FormControlsType } from "./form-controls.type";
import { GenericFormGroup } from "./generic-form-group.interface";
import { Settings } from "../types";

export interface FormGroups {
    [FormGroupTypes.Customers]: GenericFormGroup<
        FormControlsType<Customer>,
        Customer
    >;
    [FormGroupTypes.Settings]: GenericFormGroup<
        FormControlsType<Settings>,
        Settings
    >;
    [FormGroupTypes.Invoices]: GenericFormGroup<
        FormControlsType<Invoice>,
        Invoice
    >;
}