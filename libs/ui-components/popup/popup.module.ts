import { NgModule } from "@angular/core";
import { PopupComponent } from "./popup.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "../button";
import { TextFieldModule } from "../text-field";
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import { PopupService } from "./services";

const angularMaterialModules = [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
]

const uiModules = [
    ButtonModule,
]

@NgModule({
    declarations: [PopupComponent],
    imports: [angularMaterialModules, uiModules],
    providers: [PopupService],
    exports: [PopupComponent],
})
export class PopupModule { }