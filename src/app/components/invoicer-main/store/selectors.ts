import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../../store/app-state.interface";



const selectFeature = (state: AppStateInterface) => state.mainState

export const viewOptionSelectedSelector = createSelector(selectFeature, (state) => state.viewOptionSelected)
export const getProgressBarModeSelector = createSelector(selectFeature, (state) => state.progressBarMode)
