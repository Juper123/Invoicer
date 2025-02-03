import {
    HomeStateInterface,
    CustomerStateInterface,
    SettingsStateInterface,
    InvoicesStateInterface,
    MainStateInterface
} from "../components"


export interface AppStateInterface {
    mainState: MainStateInterface
    settingsState: SettingsStateInterface
    homeState: HomeStateInterface
    invoicesState: InvoicesStateInterface
    customerState: CustomerStateInterface
}