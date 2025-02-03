import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../../../store/app-state.interface";

const selectFeature = (state: AppStateInterface) => state.customerState

export const succesfullySavedSelector = createSelector(selectFeature, (state) => state.succesfullySaved)
export const selectedCustomerSelector = createSelector(selectFeature, (state) => state.selectedCustomer)
