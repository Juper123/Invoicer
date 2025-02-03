import { NgModule } from "@angular/core";
import { GridComponent } from "./grid.component";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from "@angular/common";
import { ButtonModule } from "../button";

const angularMaterialModules = [MatTableModule, ButtonModule]

@NgModule({
    declarations: [GridComponent],
    imports: [angularMaterialModules, CommonModule],
    exports: [GridComponent],
})
export class GridModule { }