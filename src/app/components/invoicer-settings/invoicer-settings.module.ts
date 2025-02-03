import { NgModule } from "@angular/core";
import { InvoicerSettingsComponent } from "./invoicer-settings.component";
import { StoreModule } from "@ngrx/store";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CardModule, ButtonModule, TextFieldModule, ComboboxModule, PopupModule } from "../../../../libs";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./store/reducers";
import { SettingsEffects } from "./store/effects";
import { CommonModule } from "@angular/common";

const uiModules = [
    CardModule,
    ButtonModule,
    TextFieldModule,
    FormsModule,
    ReactiveFormsModule,
    ComboboxModule,
    PopupModule
]


@NgModule({
    declarations: [InvoicerSettingsComponent],
    providers: [],
    imports: [
        uiModules,
        CommonModule,
        StoreModule.forFeature('settingsState', reducers),
        EffectsModule.forFeature([SettingsEffects]),
    ],
    exports: [InvoicerSettingsComponent],
})
export class InvoicerSettingsModule { }