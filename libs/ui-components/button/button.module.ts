import { NgModule } from "@angular/core";
import { ButtonComponent } from "./button.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";

const angularMaterialModules = [MatButtonModule, MatDividerModule, MatIconModule]

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, angularMaterialModules],
    exports: [ButtonComponent],
})
export class ButtonModule { }