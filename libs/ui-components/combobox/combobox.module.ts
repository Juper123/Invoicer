import { MatFormFieldModule } from "@angular/material/form-field";
import { ComboboxComponent } from "./combobox.component";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

const angularMaterialModules = [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule]

@NgModule({
    declarations: [ComboboxComponent],
    imports: [angularMaterialModules],
    exports: [ComboboxComponent],
})
export class ComboboxModule { }