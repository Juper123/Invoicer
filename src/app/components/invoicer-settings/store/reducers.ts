import { createReducer, on } from "@ngrx/store";
import { SettingsStateInterface } from "../types";
import { SETTINGS_INITIAL_STATE } from "../consts";
import * as SettingsActions from './actions'

const initialState: SettingsStateInterface = {
    settings: SETTINGS_INITIAL_STATE,
    saveSettingsSuccess: false,
    error: null
}

export const reducers = createReducer(
    initialState,
    on(SettingsActions.resetState, () => ({ ...initialState })),
    on(SettingsActions.getSettings, (state) => ({ ...state })),
    on(SettingsActions.getSettingsSuccess, (state, action) =>
        ({ ...state, settings: action.actionResult.data, error: action.actionResult.err })),
    on(SettingsActions.saveSettings, (state) => ({ ...state, saveSettingsSuccess: false })),
    on(SettingsActions.saveSettingsSuccess, (state, action) =>
        ({ ...state, settings: action.actionResult.data, saveSettingsSuccess: action.actionResult.success, error: action.actionResult.err })),
)