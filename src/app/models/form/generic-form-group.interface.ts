import { FormControl, FormGroup } from "@angular/forms";

export interface GenericFormGroup<C, T> extends FormGroup {
    readonly value: T;
    controls: Record<keyof C, FormControl>;
}