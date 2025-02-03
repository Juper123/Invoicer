import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "./app-state.interface";

const selectFeature = (state: AppStateInterface) => state

export const getSettingsSelector = createSelector(selectFeature, (state) => state.settingsState.settings)
export const getCustomersSelector = createSelector(selectFeature, (state) => state.customerState.customersGridData)
export const getProgressBarValueSelector = createSelector(selectFeature, (state) => state.invoicesState.progressValue)
