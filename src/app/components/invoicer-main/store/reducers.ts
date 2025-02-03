import { createReducer, on } from "@ngrx/store";
import { MainStateInterface } from "../types/main-state.interface";
import { ViewOptionEnum } from "../../../enums/view-option.enum";
import * as Actions from './actions'
import { ProgressBarModeEnum } from "../../../../../libs";
import { changeProgressBarMode } from "../../../store";

const initialState: MainStateInterface = {
    viewOptionSelected: ViewOptionEnum.Home,
    progressBarMode: ProgressBarModeEnum.Buffer,

}

export const reducers = createReducer(
    initialState,
    on(Actions.changeViewOptionToSettings, (state) => ({ ...state, viewOptionSelected: ViewOptionEnum.Settings })),
    on(Actions.changeViewOptionToCustomers, (state) => ({ ...state, viewOptionSelected: ViewOptionEnum.Customers })),
    on(Actions.changeViewOptionToHome, (state) => ({ ...state, viewOptionSelected: ViewOptionEnum.Home })),
    on(Actions.changeViewOptionToInvoices, (state) => ({ ...state, viewOptionSelected: ViewOptionEnum.Invoices })),
    on(changeProgressBarMode, (state, action) => ({ ...state, progressBarMode: action.progressBarMode })),

);