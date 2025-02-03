import { Settings } from "../../../models/types/settings.interface";

export interface SettingsStateInterface {
    settings: Settings
    saveSettingsSuccess: boolean,
    error: any
}