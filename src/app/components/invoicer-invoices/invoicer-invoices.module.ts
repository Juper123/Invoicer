import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { InvoicerInvoicesComponent } from "./invoicer-invoices.component";
import { CommonModule, DatePipe } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { ButtonModule, CardModule, ComboboxModule, GridModule, PopupModule, TextFieldModule } from "../../../../libs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { reducers } from "./store/reducers";
import { InvoicesEffects } from "./store/effects";
import { GridDataOperationsService, InvoicesDomainService } from "./services";
import { HttpService } from "../../services";
import { HttpClient, HttpClientModule } from "@angular/common/http";

const uiModules = [
    CardModule,
    ButtonModule,
    TextFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ComboboxModule,
    PopupModule,
    GridModule
]

@NgModule({
    declarations: [InvoicerInvoicesComponent],
    providers: [GridDataOperationsService, InvoicesDomainService, DatePipe],
    imports: [
        uiModules,
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature('invoicesState', reducers),
        EffectsModule.forFeature([InvoicesEffects]),
    ],
    exports: [InvoicerInvoicesComponent],
})
export class InvoicerInvoicesModule { }