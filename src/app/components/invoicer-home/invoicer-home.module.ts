import { NgModule } from "@angular/core";
import { InvoicerHomeComponent } from "./invoicer-home.component";
import { StoreModule } from "@ngrx/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardModule, ButtonModule, TextFieldModule } from "../../../../libs";

const uiModules = [CardModule, ButtonModule, TextFieldModule, FormsModule, ReactiveFormsModule]

@NgModule({
    declarations: [InvoicerHomeComponent],
    imports: [uiModules],
    exports: [InvoicerHomeComponent],
})
export class InvoicerHomeModule { }