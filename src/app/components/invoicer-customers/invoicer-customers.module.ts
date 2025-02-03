
import { InvoicerCustomersComponent } from "./invoicer-customers.component";
import { StoreModule } from "@ngrx/store";
import { ButtonModule, CardModule, GridModule, TextFieldModule } from "../../../../libs";
import { EffectsModule } from "@ngrx/effects";
import { CustomersEffects } from "./store/effects";
import { reducers } from "./store/reducers";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { GridDataOperationsService } from "./services/grid-data-operations.service";



const uiModules = [GridModule, CardModule, ButtonModule, TextFieldModule, FormsModule, ReactiveFormsModule]

@NgModule({
    declarations: [InvoicerCustomersComponent],
    providers: [GridDataOperationsService],
    imports: [
        CommonModule,
        uiModules,
        StoreModule.forFeature('customerState', reducers),
        EffectsModule.forFeature([CustomersEffects]),
    ],
    exports: [InvoicerCustomersComponent],
})
export class InvoicerCustomersModule { }