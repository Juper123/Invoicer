import { createAction, props } from "@ngrx/store"
import { ProgressBarModeEnum } from "../../../libs"

export const changeProgressBarMode = createAction(
    '[Shared] Change progress bar mode',
    props<{
        progressBarMode: ProgressBarModeEnum
    }>())
export const stopProgress = createAction(
    '[Shared] Stop progress',)