import { StoreModule } from "@ngrx/store";
import { InvoicerMainComponent } from "./invoicer-main.component";
import { NgModule } from "@angular/core";
import { DatabaseService, SidebarModule } from "../../../../libs";
import { MatSidenavModule } from '@angular/material/sidenav';
import { InvoicerCustomersModule } from "../invoicer-customers";
import { InvoicerHomeModule } from "../invoicer-home";
import { InvoicerInvoicesModule } from "../invoicer-invoices";
import { InvoicerSettingsModule } from "../invoicer-settings";
import { CommonModule } from "@angular/common";
import { reducers } from "./store/reducers";
import { ProgressBarModule } from "../../../../libs";
import { DatabaseModule } from "../../../../libs";
import { FormsService } from "../../services";

const angularMaterialModules = [MatSidenavModule]
const componentsModules = [
    InvoicerCustomersModule,
    InvoicerHomeModule,
    InvoicerInvoicesModule,
    InvoicerSettingsModule]
const uiModules = [SidebarModule, ProgressBarModule]

@NgModule({
    declarations: [InvoicerMainComponent],
    providers: [DatabaseService, FormsService],
    imports: [
        DatabaseModule,
        angularMaterialModules,
        uiModules,
        componentsModules,
        CommonModule,
        StoreModule.forFeature('mainState', reducers)],
    exports: [InvoicerMainComponent],
})
export class InvoicerMainModule { }