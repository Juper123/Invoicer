import { createAction, props } from "@ngrx/store";
import { SaveResponse } from "../../../../../libs";
import { Settings } from "../../../models/types";

export const resetState = createAction(
    '[Settings] Reset state',)

export const getSettings = createAction(
    '[Settings] Get settings',)

export const getSettingsSuccess = createAction(
    '[Settings] Get settings success',
    props<{
        actionResult: SaveResponse<Settings>
    }>())

export const saveSettings = createAction(
    '[Settings] Save settings',)

export const saveSettingsSuccess = createAction(
    '[Settings] Save settings success',
    props<{
        actionResult: SaveResponse<Settings>
    }>())