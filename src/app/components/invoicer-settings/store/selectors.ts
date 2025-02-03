import { createSelector } from "@ngrx/store"
import { AppStateInterface } from "../../../store/app-state.interface"

const selectFeature = (state: AppStateInterface) => state.settingsState

export const saveSettingsSuccessSelector = createSelector(selectFeature, (state) => state.saveSettingsSuccess)