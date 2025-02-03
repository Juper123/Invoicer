import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextFieldComponent } from "./text-field.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask"


const angularMaterialModules =
    [
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,

    ]

@NgModule({
    declarations: [TextFieldComponent],
    imports: [angularMaterialModules, NgxMaskDirective, NgxMaskPipe],
    exports: [TextFieldComponent],
    providers: [provideNgxMask()]
})
export class TextFieldModule { }